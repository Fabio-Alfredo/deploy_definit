package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class GenerateQrDTO {
    private UUID request;
    private Date solicitationDate;
}
