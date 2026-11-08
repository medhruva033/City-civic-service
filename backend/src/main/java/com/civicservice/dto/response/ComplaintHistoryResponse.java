
package com.civicservice.dto.response;

import com.civicservice.entity.ComplaintStatus;
import com.civicservice.entity.ComplaintStatusHistory;

import java.time.LocalDateTime;

public class ComplaintHistoryResponse {

    private Long id;
    private ComplaintStatus previousStatus;
    private ComplaintStatus newStatus;
    private String remarks;
    private String changedByName;
    private LocalDateTime changedAt;

    public ComplaintHistoryResponse(ComplaintStatusHistory history) {

        this.id = history.getId();
        this.previousStatus = history.getPreviousStatus();
        this.newStatus = history.getNewStatus();
        this.remarks = history.getRemarks();
        this.changedByName = history.getChangedBy().getFullName();
        this.changedAt = history.getChangedAt();
    }

    public Long getId() {
        return id;
    }

    public ComplaintStatus getPreviousStatus() {
        return previousStatus;
    }

    public ComplaintStatus getNewStatus() {
        return newStatus;
    }

    public String getRemarks() {
        return remarks;
    }

    public String getChangedByName() {
        return changedByName;
    }

    public LocalDateTime getChangedAt() {
        return changedAt;
    }
}
