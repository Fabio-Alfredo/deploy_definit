package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.AssignHousesUsersDTO;
import com.safehouse.safehouse.domain.dtos.AssignResidentAdminDTO;
import com.safehouse.safehouse.domain.dtos.ContractEmployeeDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;
    private final HouseService houseService;
    private final RoleService roleService;

    public UserController(UserService userService, HouseService houseService, RoleService roleService) {
        this.userService = userService;
        this.houseService = houseService;
        this.roleService = roleService;
    }

    @GetMapping("/one")
    public ResponseEntity<GeneralResponse> getUser(){
        try {
            User user = userService.findUserAuthenticated();
            if(user == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            return GeneralResponse.getResponse(HttpStatus.OK, user);
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

//    @PreAuthorize("hasAnyAuthority('ADMN')")
    @GetMapping("/all")
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
            User user = userService.getByEmail(req.getEmail().get(0));

            House house = houseService.getHouseByAddress(req.getHouse());

            if(user == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "User not found!");
            if(house == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");
            if(house.getResidentAdmin()!=null) return GeneralResponse.getResponse(HttpStatus.FOUND, "House already has an admin!");

            userService.assignHouseAdmin(user, house, roleService.getRoleById("RSAD"));
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
            User user = userService.findUserAuthenticated();
            List<User> users = userService.getAllUsersByEmail(req.getEmails());
            House house = houseService.getHouseByAddress(req.getHouse());

            if(house == null) return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");

            if(!houseService.existHouseByAdmin(user, req.getHouse()) && user.getRoles().contains(roleService.getRoleById("ADMN")) ) return GeneralResponse.getResponse(HttpStatus.FOUND, "Admin house invalid!");

            houseService.assignResidents(users, house);
            userService.assignHouses(house, users, roleService.getRoleById("RESD"));

            return   GeneralResponse.getResponse(HttpStatus.OK, "House assigned the users!");
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @GetMapping("/by-role")
    public ResponseEntity<GeneralResponse>usersByRole(){
        try {
            List<User> users = userService.getAllUsers();
            return GeneralResponse.getResponse(HttpStatus.OK, users);
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<GeneralResponse>deleteRoles(@RequestParam("email") String email){

        try{
            User user = userService.findUserAuthenticated();
            if(user == null || !user.getRoles().contains(roleService.getRoleById("ADMN"))) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Invalid admin!");
            User userUpdate = userService.getByEmail(email);
            if(userUpdate == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            userService.deleteRoles(userUpdate, roleService.getRolesById(List.of("EMPL")));

            return GeneralResponse.getResponse(HttpStatus.OK, "User deleted!");

        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @GetMapping("/employ-visitor")
    public ResponseEntity<GeneralResponse>getUsersEmployVisitor(){
        try {
            List<User> users = userService.getUsersByRole(roleService.getRolesById(List.of("VIST", "EMPL")));
            return GeneralResponse.getResponse(HttpStatus.OK,users);
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    @PostMapping("/contract-employee")
    @PreAuthorize("hasAnyAuthority('ADMN')")
    public ResponseEntity<GeneralResponse>contractEmployee(@RequestBody ContractEmployeeDTO req){
        try {
            User user = userService.findUserAuthenticated();
            User employee = userService.getByEmail(req.getEmployee());

            if(user == null || !user.getRoles().contains(roleService.getRoleById("ADMN"))) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Invalid admin! ");
            if(employee == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Employee not found!");

            userService.contractEmployee(employee, roleService.getRoleById(req.getRole()));

            return GeneralResponse.getResponse(HttpStatus.OK, "Employee contrated!");
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

}
