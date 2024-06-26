package com.safehouse.safehouse.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.UUID;

@Data
@Table(name = "qr")
@Entity
public class QR{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private String state;
    private Date lastUpdate;

    @OneToOne(mappedBy = "qr", fetch = FetchType.LAZY)
    private Request request;


}
