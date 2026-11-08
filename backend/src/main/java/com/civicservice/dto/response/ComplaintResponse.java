package com.civicservice.dto.response;

import com.civicservice.entity.Complaint;
import com.civicservice.entity.ComplaintPriority;
import com.civicservice.entity.ComplaintStatus;
import java.time.LocalDateTime;

public class ComplaintResponse {

    private Long id;
    private String title;
    private String description;
    private String categoryName;
    private ComplaintPriority priority;
    private ComplaintStatus status;
    private String location;
    private String resolutionNotes;
    private LocalDateTime submittedAt;
    private LocalDateTime updatedAt;
    private LocalDateTime resolvedAt;

    public ComplaintResponse(Complaint complaint) {
        this.id = complaint.getId();
        this.title = complaint.getTitle();
        this.description = complaint.getDescription();
        this.categoryName = complaint.getCategory().getName();
        this.priority = complaint.getPriority();
        this.status = complaint.getStatus();
        this.location = complaint.getLocation();
        this.resolutionNotes = complaint.getResolutionNotes();
        this.submittedAt = complaint.getSubmittedAt();
        this.updatedAt = complaint.getUpdatedAt();
        this.resolvedAt = complaint.getResolvedAt();
    }

    public Long getId() { return id; }
    public String getTitle() { return title; }
    public String getDescription() { return description; }
    public String getCategoryName() { return categoryName; }
    public ComplaintPriority getPriority() { return priority; }
    public ComplaintStatus getStatus() { return status; }
    public String getLocation() { return location; }
    public String getResolutionNotes() { return resolutionNotes; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public LocalDateTime getResolvedAt() { return resolvedAt; }
}