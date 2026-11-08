
package com.civicservice.service;

import com.civicservice.dto.request.CreateComplaintRequest;
import com.civicservice.dto.response.ComplaintHistoryResponse;
import com.civicservice.dto.response.ComplaintResponse;

import com.civicservice.entity.*;
import com.civicservice.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;
    private final ComplaintStatusHistoryRepository historyRepository;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            UserRepository userRepository,
            CategoryRepository categoryRepository,
            ComplaintStatusHistoryRepository historyRepository) {

        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;
        this.historyRepository = historyRepository;
    }

    // Create a new complaint
    @Transactional
    public ComplaintResponse createComplaint(
            CreateComplaintRequest request,
            String email) {

        User citizen = getCitizen(email);

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Category not found"
                ));

        if (!Boolean.TRUE.equals(category.getActive())) {
            throw new IllegalArgumentException(
                    "Selected category is inactive"
            );
        }

        Complaint complaint = new Complaint();

        complaint.setCitizen(citizen);
        complaint.setCategory(category);
        complaint.setTitle(request.getTitle().trim());
        complaint.setDescription(request.getDescription().trim());
        complaint.setPriority(request.getPriority());
        complaint.setLocation(request.getLocation().trim());
        complaint.setStatus(ComplaintStatus.SUBMITTED);

        Complaint savedComplaint = complaintRepository.save(complaint);

        // Save initial complaint status history
        ComplaintStatusHistory history = new ComplaintStatusHistory();

        history.setComplaint(savedComplaint);
        history.setChangedBy(citizen);
        history.setPreviousStatus(null);
        history.setNewStatus(ComplaintStatus.SUBMITTED);
        history.setRemarks("Complaint submitted");

        historyRepository.save(history);

        return new ComplaintResponse(savedComplaint);
    }

    // Get all complaints submitted by the logged-in citizen
    @Transactional(readOnly = true)
    public List<ComplaintResponse> getMyComplaints(String email) {

        User citizen = getCitizen(email);

        return complaintRepository
                .findByCitizenIdOrderBySubmittedAtDesc(citizen.getId())
                .stream()
                .map(ComplaintResponse::new)
                .toList();
    }

    // Get one complaint belonging to the logged-in citizen
    @Transactional(readOnly = true)
    public ComplaintResponse getMyComplaint(
            Long complaintId,
            String email) {

        User citizen = getCitizen(email);

        Complaint complaint = complaintRepository
                .findByIdAndCitizenId(complaintId, citizen.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Complaint not found"
                ));

        return new ComplaintResponse(complaint);
    }

    // Cancel a complaint if it has not been assigned or processed
    @Transactional
    public ComplaintResponse cancelComplaint(
            Long complaintId,
            String email) {

        User citizen = getCitizen(email);

        Complaint complaint = complaintRepository
                .findByIdAndCitizenId(complaintId, citizen.getId())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Complaint not found"
                ));

        if (complaint.getStatus() != ComplaintStatus.SUBMITTED
                && complaint.getStatus() != ComplaintStatus.UNDER_REVIEW) {

            throw new IllegalArgumentException(
                    "Complaint cannot be cancelled after assignment or processing"
            );
        }

        ComplaintStatus previousStatus = complaint.getStatus();

        complaint.setStatus(ComplaintStatus.CANCELLED);

        Complaint savedComplaint = complaintRepository.save(complaint);

        // Record cancellation in status history
        ComplaintStatusHistory history = new ComplaintStatusHistory();

        history.setComplaint(savedComplaint);
        history.setChangedBy(citizen);
        history.setPreviousStatus(previousStatus);
        history.setNewStatus(ComplaintStatus.CANCELLED);
        history.setRemarks("Cancelled by citizen");

        historyRepository.save(history);

        return new ComplaintResponse(savedComplaint);
    }

    // Get status history for a complaint belonging to the citizen
    @Transactional(readOnly = true)
    public List<ComplaintHistoryResponse> getMyComplaintHistory(
            Long complaintId,
            String email) {

        User citizen = getCitizen(email);

        complaintRepository.findByIdAndCitizenId(
                complaintId,
                citizen.getId()
        ).orElseThrow(() -> new IllegalArgumentException(
                "Complaint not found"
        ));

        return historyRepository
                .findByComplaintIdOrderByChangedAtAsc(complaintId)
                .stream()
                .map(ComplaintHistoryResponse::new)
                .toList();
    }

    // Validate the logged-in citizen
    private User getCitizen(String email) {

        User citizen = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException(
                        "User not found"
                ));

        if (citizen.getRole() != UserRole.CITIZEN) {
            throw new IllegalArgumentException(
                    "Only citizens can access this resource"
            );
        }

        if (!Boolean.TRUE.equals(citizen.getActive())) {
            throw new IllegalArgumentException(
                    "User account is inactive"
            );
        }

        return citizen;
    }
}
