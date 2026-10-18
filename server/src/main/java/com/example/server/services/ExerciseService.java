package com.example.server.services;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.example.server.dtos.addExerciseReq;
import com.example.server.entities.Exercise;
import com.example.server.repositories.ExerciseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExerciseService {
  public final ExerciseRepository exerciseRep;

  public void addExercise(addExerciseReq req) {
    Exercise exercise = Exercise.builder().day(req.day).name(req.name).membership(req.membership).build();
    exerciseRep.save(exercise);
  }

  public List<Exercise> getExercisesForOne(String id) {
    List<Exercise> exercises = exerciseRep.findByMembership(id);
    return exercises;
  }

  public void deleteExercise(Map<String, String> data) {
    UUID id = UUID.fromString(data.get("id"));
    exerciseRep.deleteById(id);
  }
}
