package com.safehouse.safehouse.services.contrat;


import com.safehouse.safehouse.domain.models.Role;

import java.util.List;

public interface RoleService {
    String saveRole(Role role);
    Role getRoleById(String id);
    List<Role>getAllRoles();
    List<Role>getRolesById(List<String> ids);

}
