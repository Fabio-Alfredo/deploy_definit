package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class AssignResidentAdminDTO {
    private UUID id;
    private String email;
}
