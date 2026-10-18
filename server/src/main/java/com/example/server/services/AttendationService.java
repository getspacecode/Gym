package com.example.server.services;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.server.entities.Attendation;
import com.example.server.repositories.AttendationRepository;

@Service
public class AttendationService {
  private final AttendationRepository attRep;

  public AttendationService(AttendationRepository ar) {
    this.attRep = ar;
  }

  public Attendation createAttendation(Attendation body) {
    attRep.save(body);
    return body;
  }

  public List<Attendation> allAttendations() {
    return attRep.findAll(Sort.by(Sort.Direction.DESC, "time"));
  }

  public List<Attendation> findSpecific(String query) {
    List<Attendation> result = attRep.findByNameContainingIgnoreCase(query);
    return result;
  }

  public void deleteSpecific(String id) {
    attRep.deleteById(id);
  }

  public List<Attendation> single(String id) {
    List<Attendation> list = attRep.findByMembershipId(id);
    return list;
  }
}
