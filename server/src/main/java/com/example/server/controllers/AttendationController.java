package com.example.server.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.entities.Attendation;
import com.example.server.services.AttendationService;

@RestController()
@RequestMapping("attendation")
public class AttendationController {
  private final AttendationService service;

  public AttendationController(AttendationService as) {
    this.service = as;
  }

  @PostMapping("create")
  public Attendation createAttendation(@RequestBody Attendation body) {
    return this.service.createAttendation(body);
  }

  @GetMapping("all")
  public List<Attendation> allAttendations(@RequestParam(required = false) String query) {
    if (query == null || query.isBlank()) {
      return service.allAttendations();
    }
    return service.findSpecific(query);
  }

  @DeleteMapping("delete")
  public void deleteAttendation(@RequestBody Map<String, String> body) {
    service.deleteSpecific(body.get("id"));
  }

  @GetMapping("{id}")
  public List<Attendation> single(@PathVariable("id") String id) {
    return service.single(id);
  }

}
