package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateHouseDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.UpdateResidentAdminTDO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/house")
@CrossOrigin("*")
public class HouseController {

    private final HouseService houseService;
    private final UserService userService;
    private final RoleService roleService;


    public HouseController(HouseService houseService, UserService userService, RoleService roleService) {
        this.houseService = houseService;
        this.userService = userService;
        this.roleService = roleService;
    }

    @PostMapping("/new")
//    @PreAuthorize("hasAnyAuthority('ADMN')")
    public ResponseEntity<GeneralResponse> createHouse(@RequestBody CreateHouseDTO house) {
        try {
            if(houseService.existHouseByAddress(house.getAddress())){
                return GeneralResponse.getResponse(HttpStatus.FOUND, "House already exists!");
            }

            houseService.createHouse(house);
            return GeneralResponse.getResponse(HttpStatus.OK, "House created!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @GetMapping("/all")
//    @PreAuthorize("hasAnyAuthority('ADMN')")
    public ResponseEntity<GeneralResponse> getAllHouses(@RequestParam(value = "filter" , required = false) String filter){
        try {
            User user = userService.findUserAuthenticated();
            if(user == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            List<House> houses = houseService.getAllHouses();
            List<House>houses1= new ArrayList<>();
            if(filter==null){
                System.out.println("filter null");
                for(House h:houses){
                    if(h.getResidentAdmin() != null){
                        houses1.add(h);
                    }
                }
            }else{
                System.out.println("filter not null");
                for(House h:houses){
                    if(h.getResidentAdmin() == null && h.getUsers().isEmpty()){
                        houses1.add(h);
                    }
                }
            }

            houses1.sort(Comparator.comparing(House::getAddress));

            return GeneralResponse.getResponse(HttpStatus.OK, houses1);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" +e.getMessage());
        }
    }

    @PostMapping ("/delete")
    public ResponseEntity<GeneralResponse>deleteUser(@RequestParam("houseId") UUID houseId, @RequestParam("email") String email){
        try{
            User user = userService.findUserAuthenticated();
            User resident = userService.getByEmail(email);
            House house = houseService.getHouseById(houseId);

            if(user == null || !user.getRoles().contains(roleService.getRoleById("ADMN")))
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Invalid admin!");
            if(!house.getUsers().contains(resident))
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            userService.deleteHouseUser(house, resident);
            houseService.deleteUserHouse(house, resident);

            return GeneralResponse.getResponse(HttpStatus.OK, "User deleted!");

        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @PostMapping("/assign/new-admin")
    public ResponseEntity<GeneralResponse>assignHouseAdmin(@RequestBody UpdateResidentAdminTDO req){
        try {

            User newAdmin = userService.getByEmail(req.getNewAdmin());
            User oldUser = userService.getByEmail(req.getOldAdmin());
            House updateHouse = houseService.getHouseById(req.getHouse());

            if(!updateHouse.getUsers().isEmpty()){
                if(newAdmin == null || !userService.existUserByEmail(req.getNewAdmin())) return GeneralResponse.getResponse(HttpStatus.FOUND, "User not found!");

            }

            userService.updateAdminHouse(newAdmin,oldUser, updateHouse, roleService.getRoleById("RSAD"));
            houseService.assignResidentAdmin(updateHouse, newAdmin);
            return GeneralResponse.getResponse(HttpStatus.OK, "House assigned to user!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

//    @PostMapping("/assign")
//    public ResponseEntity<GeneralResponse>assignResidents(@RequestBody HouseAssignUsersDTO req){
//        System.out.println(req.getEmails());
//        try {
//            List<User>users = userService.getAllUsersByEmail(req.getEmails());
//            House house = houseService.getHouseByAddress(req.getAddress());
//            if(house == null){
//                return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");
//            }
//
//            houseService.assignResidents(users, house);
//            userService.assignHouses(house, users);
//            return GeneralResponse.getResponse(HttpStatus.OK, "Residents assigned!");
//        } catch (Exception e) {
//            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
//        }
//    }
}
