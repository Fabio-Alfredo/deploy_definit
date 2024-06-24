package com.safehouse.safehouse.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Table(name = "request")
@Entity
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    private Date createAt;
    @Column(name = "strar_date")
    private Date creationDate;
    @Column(name = "enable_time")
    private Date enableTme;
    @Column(name = "disable_time")
    private Date disableTime;
    @Column(name = "end_time")
    private String endTime;
    private String reason;
    private String phase;


    @ManyToOne(optional = false, fetch=FetchType.EAGER)
    private User resident;

    @ManyToOne(optional = false, fetch=FetchType.EAGER)
    @JsonIgnore
    private User visitor;

    @ManyToOne(optional = false, fetch=FetchType.EAGER)
    private House house;

   @OneToOne( cascade = CascadeType.ALL, fetch = FetchType.LAZY)
   @JoinColumn(name = "id_qr", referencedColumnName = "id")
   @JsonIgnore
   private QR qr;
}
