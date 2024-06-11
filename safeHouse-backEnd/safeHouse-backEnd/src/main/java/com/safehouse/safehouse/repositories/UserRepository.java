package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
    List<User>findAllByEmailIn(List<String> emails);
}
