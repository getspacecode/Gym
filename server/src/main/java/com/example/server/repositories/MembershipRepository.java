package com.example.server.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.server.entities.Membership;

@Repository
public interface MembershipRepository extends JpaRepository<Membership, String> {

}
