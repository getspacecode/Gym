package com.example.server.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.server.services.MembershipService;
import com.example.server.dtos.LoginResponseDTO;
import com.example.server.entities.Membership;

@RestController()
@RequestMapping("membership")
public class MembershipController {
  private final MembershipService service;

  public MembershipController(MembershipService service) {
    this.service = service;
  }

  @GetMapping("all")
  public List<Membership> allMembers() {
    return this.service.allMembers();
  }

  @PostMapping("authenticate")
  public LoginResponseDTO postMembership(@RequestBody Map<String, String> body) {
    String input = body.get("input");

    return service.authenticate(input);
  }

  @PostMapping("{id}")
  public ResponseEntity<Membership> getMembership(@PathVariable String id) {
    return service.getMembership(id);
  }

  @PostMapping("create")
  public Membership newMembership(@RequestBody Map<String, String> body) {
    return service.createMembership(body.get("name"));
  }

  @DeleteMapping("delete")
  public void deleteMember(@RequestBody Map<String, String> body) {
    service.deleteMember(body.get("id"));
  }

}
