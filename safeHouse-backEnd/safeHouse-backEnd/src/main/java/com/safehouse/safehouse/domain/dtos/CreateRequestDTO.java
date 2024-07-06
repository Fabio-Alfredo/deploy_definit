package com.safehouse.safehouse.domain.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;

@Data
public class CreateRequestDTO {

    private Date creationDate;
    private String reason;
    private Date enableTme;
    private Date disableTime;
    private String visitor;
    private String address;
//    private String house;




    public void setEnableAndDisableTime() {
        if (this.creationDate != null) {
            // Convert creationDate to LocalDateTime in UTC
            LocalDateTime localDateTime = LocalDateTime.ofInstant(this.creationDate.toInstant(), ZoneId.of("UTC"));
            LocalDateTime enableDateTime = localDateTime.minusMinutes(30);
            LocalDateTime disableDateTime = localDateTime.plusMinutes(30);

            // Convert LocalDateTime back to Date with UTC time zone
            this.enableTme = Date.from(enableDateTime.atZone(ZoneId.of("UTC")).toInstant());
            this.disableTime = Date.from(disableDateTime.atZone(ZoneId.of("UTC")).toInstant());
        }
    }

    public void setCreationDate() {
        ZonedDateTime utcDateTime = ZonedDateTime.now(ZoneId.of("UTC"));
        ZonedDateTime adjustedDateTime = utcDateTime.minusHours(6);
        this.creationDate = Date.from(adjustedDateTime.toInstant());
    }

}
