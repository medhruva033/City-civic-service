
package com.civicservice.controller;

import com.civicservice.dto.request.CreateComplaintRequest;
import com.civicservice.dto.response.ComplaintResponse;
import com.civicservice.dto.response.ComplaintHistoryResponse;
import com.civicservice.service.ComplaintService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/complaints")
public class ComplaintController {

    private final ComplaintService complaintService;

    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
    }

    // Create a new complaint
    @PostMapping
    public ResponseEntity<ComplaintResponse> createComplaint(
            @Valid @RequestBody CreateComplaintRequest request,
            Authentication authentication) {

        ComplaintResponse response = complaintService.createComplaint(
                request,
                authentication.getName()
        );

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // Get all complaints belonging to the logged-in citizen
    @GetMapping
    public ResponseEntity<List<ComplaintResponse>> getMyComplaints(
            Authentication authentication) {

        return ResponseEntity.ok(
                complaintService.getMyComplaints(authentication.getName())
        );
    }

    // Get one complaint
    @GetMapping("/{id}")
    public ResponseEntity<ComplaintResponse> getMyComplaint(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                complaintService.getMyComplaint(id, authentication.getName())
        );
    }

    // Cancel a complaint
    @PatchMapping("/{id}/cancel")
    public ResponseEntity<ComplaintResponse> cancelComplaint(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                complaintService.cancelComplaint(id, authentication.getName())
        );
    }

    // Get complaint status history
    @GetMapping("/{id}/history")
    public ResponseEntity<List<ComplaintHistoryResponse>> getComplaintHistory(
            @PathVariable Long id,
            Authentication authentication) {

        return ResponseEntity.ok(
                complaintService.getMyComplaintHistory(
                        id,
                        authentication.getName()
                )
        );
    }
}
