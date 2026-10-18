package com.example.server.dtos;

import com.example.server.entities.Membership;

public class LoginResponseDTO {
  private String token;
  private Membership membership;

  public LoginResponseDTO(String t, Membership m) {
    this.token = t;
    this.membership = m;
  }

  public String getToken() {
    return token;
  }

  public Membership getMembership() {
    return membership;
  }
}
