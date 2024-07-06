package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, String> {

}
