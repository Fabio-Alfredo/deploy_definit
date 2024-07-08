package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.TokenDto;
import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final UserService userService;
    private final RoleService roleService;

    public AuthController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostMapping("/login")
    public ResponseEntity<GeneralResponse> login(@RequestBody @Valid UserLoginDTO info){

        try {

            UserDTO user = userService.getUserInformation(info.getToken());
            if(!userService.existUserByEmail(user.getEmail())){
                List<String>userRoles= new ArrayList<>() ;
                userRoles.add("VIST");
                List<Role> roles = roleService.getRolesById(userRoles);
                userService.createUser(user, roles);
            }

            User res = userService.getByEmail(user.getEmail());
            Token token = userService.registerToken(res);
            return GeneralResponse.getResponse(HttpStatus.OK, new TokenDto(token));
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.UNAUTHORIZED, "Invalid token");
        }
    }
}
