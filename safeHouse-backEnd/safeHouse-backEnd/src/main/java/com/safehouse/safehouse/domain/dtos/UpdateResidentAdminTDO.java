package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.UUID;

@Data
public class UpdateResidentAdminTDO {
    private UUID house;
    private String oldAdmin;
    private String newAdmin;
}
