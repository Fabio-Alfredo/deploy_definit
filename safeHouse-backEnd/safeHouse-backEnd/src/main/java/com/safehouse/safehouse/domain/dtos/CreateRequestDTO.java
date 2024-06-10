package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class CreateRequestDTO {

    private Date createdDate;
    private String enableTime;
    private String disableTime;
    private String reason;
    private String resident;
    private String visitor;
    private UUID house;
}
