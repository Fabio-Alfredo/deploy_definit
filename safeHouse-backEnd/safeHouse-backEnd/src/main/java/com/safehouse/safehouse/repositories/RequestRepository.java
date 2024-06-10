package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.Request;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.*;
import java.util.UUID;

public interface RequestRepository extends JpaRepository<Request, UUID>{
}
