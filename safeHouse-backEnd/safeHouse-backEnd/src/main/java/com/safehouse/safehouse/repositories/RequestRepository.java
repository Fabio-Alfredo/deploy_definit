package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, UUID>{

    Boolean existsByHouseAndVisitorAndCreationDateBetween(House house, User visitor, Date enableTme, Date disableTime);
    List<Request>findAllByResident(User resident);
    List<Request>findAllByResidentAndPhase(User resident, String phase);
    Optional<Request> findTopByVisitorOrderByCreateAtDesc(User user);
    List<Request>findAllByVisitor(User visitor);
}
