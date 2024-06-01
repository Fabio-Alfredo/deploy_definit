package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.repositories.RoleRepository;
import com.safehouse.safehouse.services.contrat.RoleService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;

    public RoleServiceImpl(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public String saveRole(Role role) {
        roleRepository.save(role);
        return "Correctly saved role";
    }
}
