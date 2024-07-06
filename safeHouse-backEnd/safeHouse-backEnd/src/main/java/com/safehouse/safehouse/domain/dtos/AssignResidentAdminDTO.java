package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class AssignResidentAdminDTO {
    private String house;
    private List<String> email;
}
