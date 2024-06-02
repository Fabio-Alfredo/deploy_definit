package com.safehouse.safehouse.services.contrat;


import com.safehouse.safehouse.domain.models.Role;

public interface RoleService {
    String saveRole(Role role);
    Role getRoleById(String id);

}
