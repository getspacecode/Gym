package com.example.server.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Membership {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String membershipId;

  @NotNull
  @NotBlank
  @Size(min = 4, max = 30)
  private String name;
  @NotNull
  private LocalDateTime startDate;
  @NotNull
  private LocalDateTime endDate;

  @PrePersist
  public void prePersist() {
    this.startDate = LocalDateTime.now();
    this.endDate = this.startDate.plusDays(31);
  }

  public void initializeTime() {
    this.startDate = LocalDateTime.now();
    this.endDate = this.startDate.plusDays(31);
  }

  public boolean isActive() {
    return LocalDateTime.now().isBefore(endDate);
  }

  public String getMembershipId() {
    return membershipId;
  }

  public void setMembershipId(String membershipId) {
    this.membershipId = membershipId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getStart() {
    return startDate;
  }

  public void setStart(LocalDateTime start) {
    this.startDate = start;
  }

  public LocalDateTime getEnd() {
    return endDate;
  }

  public void setEnd(LocalDateTime end) {
    this.endDate = end;
  }
}
