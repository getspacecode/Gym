package com.example.server.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.server.entities.Exercise;

public interface ExerciseRepository extends JpaRepository<Exercise, UUID> {
  List<Exercise> findByMembership(String membership);
}
