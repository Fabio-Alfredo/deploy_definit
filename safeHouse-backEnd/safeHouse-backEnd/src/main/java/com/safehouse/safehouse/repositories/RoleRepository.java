package com.safehouse.safehouse.repositories;

import com.safehouse.safehouse.domain.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role, String> {

}
