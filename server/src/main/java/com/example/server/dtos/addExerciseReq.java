package com.example.server.dtos;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class addExerciseReq {
  public String name;
  public String day;
  public String membership;
}
