package com.example.server.entities;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Exercise {
  @Id
  @GeneratedValue
  @Column(updatable = false, nullable = false)
  private UUID id;

  @Column(updatable = true, nullable = false)
  @NotBlank(message = "Must be a day of the week")
  private String day;

  @Column(updatable = false, nullable = false)
  @NotBlank()
  private String membership;

  @Column(updatable = true, nullable = false)
  @NotBlank(message = "Must have a name")
  private String name;
}
