package com.safehouse.safehouse.domain.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "house")
public class House {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name ="house_number")
    private String address;

    @ManyToMany(mappedBy = "houses")
    @JsonIgnore
    private List<User> users;

    @OneToMany(mappedBy = "house", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Request> requests;

}
