package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.*;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, UUID>{

    Boolean existsByHouseAndVisitorAndCreationDateBetween(House house, User visitor, Date enableTme, Date disableTime);
}
