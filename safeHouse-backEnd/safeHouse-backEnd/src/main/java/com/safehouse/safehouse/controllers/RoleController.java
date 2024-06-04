package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.services.contrat.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/role")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;

    }

    @PostMapping("/save")
    public ResponseEntity<?> createRole(@RequestBody Role role){
        try {
            if(role == null){
                return ResponseEntity.badRequest().body("Role is null");
            }
            return ResponseEntity.ok(roleService.saveRole(role));
        }catch (Exception e){
            return ResponseEntity.badRequest().body("Error saving role");
        }
    }
}
