package com.example.server.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.dtos.addExerciseReq;
import com.example.server.entities.Exercise;
import com.example.server.services.ExerciseService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequiredArgsConstructor
@RequestMapping("exercise")
public class ExerciseController {
  public final ExerciseService exerciseService;

  @PostMapping("add")
  public void addExercise(@Valid @RequestBody addExerciseReq req) {
    exerciseService.addExercise(req);
  }

  @GetMapping("{id}")
  public List<Exercise> getExercisesForOne(@PathVariable String id) {
    return exerciseService.getExercisesForOne(id);
  }

  @DeleteMapping("delete")
  public void deleteExercise(@RequestBody Map<String, String> data) {
    exerciseService.deleteExercise(data);
  }
}
