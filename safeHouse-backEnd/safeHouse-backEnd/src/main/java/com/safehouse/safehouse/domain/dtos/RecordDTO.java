package com.safehouse.safehouse.domain.dtos;

import com.safehouse.safehouse.domain.models.User;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class RecordDTO {
    private UUID id;
    private String reason;
    private Date endTime;
    private User visitor;
}
