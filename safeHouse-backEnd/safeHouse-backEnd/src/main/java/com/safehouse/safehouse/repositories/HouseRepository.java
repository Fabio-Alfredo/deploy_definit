package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.House;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface HouseRepository extends JpaRepository<House, UUID> {
    Boolean existsByAddress(String address);
    Optional<House> findByAddress(String address);
}
