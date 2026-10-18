package com.example.server.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entities.Attendation;

public interface AttendationRepository extends JpaRepository<Attendation, String> {
  List<Attendation> findByNameContainingIgnoreCase(String name);

  List<Attendation> findByMembershipId(String membershipId);
}
