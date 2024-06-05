package com.safehouse.safehouse.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

@Data
@Table(name = "qr")
@Entity
public class QR{
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String state;

    @OneToOne(mappedBy = "qr", fetch = FetchType.LAZY)
    @JsonIgnore
    private Request request;


}
