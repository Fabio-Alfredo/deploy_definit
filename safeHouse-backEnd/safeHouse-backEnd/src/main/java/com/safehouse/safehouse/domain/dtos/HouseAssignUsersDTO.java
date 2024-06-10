package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.List;

@Data
public class HouseAssignUsersDTO {
    private String address;
    private List<String>emails;
}
