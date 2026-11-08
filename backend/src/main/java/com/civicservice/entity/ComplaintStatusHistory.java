package com.civicservice.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_status_history")
public class ComplaintStatusHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "complaint_id", nullable = false)
    private Complaint complaint;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "changed_by", nullable = false)
    private User changedBy;

    @Enumerated(EnumType.STRING)
    @Column(name = "previous_status")
    private ComplaintStatus previousStatus;

    @Enumerated(EnumType.STRING)
    @Column(name = "new_status", nullable = false)
    private ComplaintStatus newStatus;

    @Column(length = 1000)
    private String remarks;

    @Column(name = "changed_at", insertable = false, updatable = false)
    private LocalDateTime changedAt;

    public ComplaintStatusHistory() {}

    public Long getId() { return id; }
    public Complaint getComplaint() { return complaint; }
    public User getChangedBy() { return changedBy; }
    public ComplaintStatus getPreviousStatus() { return previousStatus; }
    public ComplaintStatus getNewStatus() { return newStatus; }
    public String getRemarks() { return remarks; }
    public LocalDateTime getChangedAt() { return changedAt; }

    public void setComplaint(Complaint complaint) {
        this.complaint = complaint;
    }

    public void setChangedBy(User changedBy) {
        this.changedBy = changedBy;
    }

    public void setPreviousStatus(ComplaintStatus previousStatus) {
        this.previousStatus = previousStatus;
    }

    public void setNewStatus(ComplaintStatus newStatus) {
        this.newStatus = newStatus;
    }

    public void setRemarks(String remarks) {
        this.remarks = remarks;
    }
}