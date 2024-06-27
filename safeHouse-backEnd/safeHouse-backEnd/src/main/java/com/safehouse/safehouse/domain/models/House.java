package com.safehouse.safehouse.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    @Column(name ="house_number")
    private String address;

    @ManyToMany(mappedBy = "houses")
    private List<User> users;

    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Request> requests;

    @ManyToOne(fetch = FetchType.EAGER)
    private User residentAdmin;

}
