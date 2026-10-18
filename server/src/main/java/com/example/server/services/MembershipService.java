package com.example.server.services;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.example.server.dtos.LoginResponseDTO;
import com.example.server.entities.Membership;
import com.example.server.repositories.MembershipRepository;

@Service
public class MembershipService {
  public final MembershipRepository membershipRep;
  public final JwtService jwtService;

  public MembershipService(MembershipRepository membershipRep, JwtService jwtService) {
    this.membershipRep = membershipRep;
    this.jwtService = jwtService;
  }

  public LoginResponseDTO authenticate(String id) {
    Membership membership = membershipRep.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    String token = jwtService.generateToken(id);
    return new LoginResponseDTO(token, membership);
  }

  public ResponseEntity<Membership> getMembership(String id) {
    return membershipRep.findById(id)
        .map(ResponseEntity::ok)
        .orElse(ResponseEntity.notFound().build());
  }

  public List<Membership> allMembers() {
    return membershipRep.findAll(Sort.by(Sort.Direction.DESC, "startDate"));
  }

  public Membership createMembership(String name) {
    Membership newMembership = new Membership();
    newMembership.prePersist();
    newMembership.setName(name);
    membershipRep.save(newMembership);
    return newMembership;
  }

  public void deleteMember(String id) {
    membershipRep.deleteById(id);
  }
}
