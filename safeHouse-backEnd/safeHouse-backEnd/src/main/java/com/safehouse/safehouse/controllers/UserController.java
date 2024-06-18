package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.AssignHousesUsersDTO;
import com.safehouse.safehouse.domain.dtos.AssignResidentAdminDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;
    private final HouseService houseService;
    private final RoleService roleService;

    public UserController(UserService userService, HouseService houseService, RoleService roleService) {
        this.userService = userService;
        this.houseService = houseService;
        this.roleService = roleService;
    }

    @PreAuthorize("hasAnyAuthority('ADMN')")
    @GetMapping("all")
    public ResponseEntity<GeneralResponse> findAllUsers(){
        try {
            List<User> users = userService.getAllUsers();
            return GeneralResponse.getResponse(HttpStatus.OK, users );
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/assign/admin-house")
//    @PreAuthorize("hasAnyAuthority('ADMN')")
    public ResponseEntity<GeneralResponse>assignHouseToUser(@RequestBody AssignResidentAdminDTO req){
        try {
            User user = userService.getByEmail(req.getEmail());
            House house = houseService.getHouseById(req.getHouse());

            if(user == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "User not found!");
            if(house == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");


            userService.assignHouseAdmin(user, house, roleService.assignRole("RSAD"));
            houseService.assignResidentAdmin(house, user);

            return GeneralResponse.getResponse(HttpStatus.OK, "House assigned to user!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @PostMapping("/assign/users-house")
//    @PreAuthorize("hasAnyAuthority('ADMN', 'RSAD')")
    public ResponseEntity<GeneralResponse>assignHouseUsers(@RequestBody AssignHousesUsersDTO req){
        try{
            User user = userService.getByEmail(req.getAdmin());
            List<User> users = userService.getAllUsersByEmail(req.getEmails());
            House house = houseService.getHouseById(req.getHouse());

            if(house == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");
            if(!houseService.existHouseByAdmin(user, req.getHouse())) return GeneralResponse.getResponse(HttpStatus.FOUND, "User not found!");

            houseService.assignResidents(users, house);
            userService.assignHouses(house, users, roleService.assignRole("RESD"));

            return   GeneralResponse.getResponse(HttpStatus.OK, "House assigned the users!");
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }


}
