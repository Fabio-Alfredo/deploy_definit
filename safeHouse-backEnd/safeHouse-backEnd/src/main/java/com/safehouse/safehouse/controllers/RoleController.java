package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/role")
@CrossOrigin("*")
public class RoleController {

    private final RoleService roleService;
    private final UserService userService;

    public RoleController(RoleService roleService, UserService userService) {
        this.roleService = roleService;

        this.userService = userService;
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

    @GetMapping("/all")
    public ResponseEntity<GeneralResponse>getRoles(){
        try {
            return GeneralResponse.getResponse(HttpStatus.OK, roleService.getAllRoles());
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.BAD_REQUEST, "Error getting roles");
        }
    }

    @GetMapping("/roles")
    public ResponseEntity<GeneralResponse>getRolesByUser(){
        try {
           User user = userService.findUserAuthenticated();
            return GeneralResponse.getResponse(HttpStatus.OK, user.getRoles());
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.BAD_REQUEST, "Error getting roles");
        }
    }
}
