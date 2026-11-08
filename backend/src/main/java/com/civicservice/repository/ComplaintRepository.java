
package com.civicservice.repository;

import com.civicservice.entity.Complaint;
import com.civicservice.entity.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCitizenIdOrderBySubmittedAtDesc(Long citizenId);

    Optional<Complaint> findByIdAndCitizenId(Long id, Long citizenId);

    List<Complaint> findByAssignedStaffIdOrderBySubmittedAtDesc(Long staffId);

    List<Complaint> findByStatusOrderBySubmittedAtDesc(ComplaintStatus status);
}
