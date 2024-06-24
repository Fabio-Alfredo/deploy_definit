package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface QrRepository extends JpaRepository<QR, UUID>{
    Boolean existsByRequest(Request request);
    Optional<QR> findByIdAndLastUpdate(UUID id, Date lastUpdate);
}
