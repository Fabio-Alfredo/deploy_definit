package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
public class QRDataDTO {
     private UUID requestId;
     private UUID qrId;
     private Date lastUpdate;
}
