package com.example.server.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Attendation {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private String id;

  @NotNull
  private LocalDateTime time;

  @NotNull
  @NotBlank
  private String name;

  @NotNull
  @NotBlank
  private String membershipId;

  @NotNull
  private boolean activeMembership;

  public Attendation(String id, LocalDateTime time, String name, String membershipId, boolean activeMembership) {
    this.id = id;
    this.time = time;
    this.name = name;
    this.membershipId = membershipId;
    this.activeMembership = activeMembership;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public LocalDateTime getTime() {
    return time;
  }

  public void setTime(LocalDateTime time) {
    this.time = time;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMembershipId() {
    return membershipId;
  }

  public void setMembershipId(String membershipId) {
    this.membershipId = membershipId;
  }

  public boolean isActiveMembership() {
    return activeMembership;
  }

  public void setActiveMembership(boolean activeMembership) {
    this.activeMembership = activeMembership;
  }
}
