package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AssignHousesUsersDTO {
    private UUID house;
    private String admin;
    private List<String>emails;
}
