package com.safehouse.safehouse.domain.dtos;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class RequestMultipleDTO {
    private String visitor;
    private String reason;
    private String address;
    private List<Date> enableTme;
    private List<Date> disableTime;
}
