package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class RequestMultipleDTO {
    private String visitor;
    private String reason;
    private List<Date> date;
    private Date enableTme;
    private Date disableTime;
}
