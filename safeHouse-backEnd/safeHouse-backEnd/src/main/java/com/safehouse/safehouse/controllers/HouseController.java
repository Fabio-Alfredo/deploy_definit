package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateHouseDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.HouseAssignUsersDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/house")
public class HouseController {

    private final HouseService houseService;
    private final UserService userService;


    public HouseController(HouseService houseService, UserService userService) {
        this.houseService = houseService;
        this.userService = userService;
    }

    @PostMapping("/new")
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
    public ResponseEntity<GeneralResponse> getAllHouses(){
        try {
            return GeneralResponse.getResponse(HttpStatus.OK, houseService.getAllHouses());
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @PostMapping("/assign")
    public ResponseEntity<GeneralResponse>assignResidents(@RequestBody HouseAssignUsersDTO req){
        System.out.println(req.getEmails());
        try {
            List<User>users = userService.getAllUsersByEmail(req.getEmails());
            House house = houseService.getHouseByAddress(req.getAddress());
            if(house == null){
                return GeneralResponse.getResponse(HttpStatus.FOUND, "House not found!");
            }

            houseService.assignResidents(users, house);
            userService.assignHouses(house, users);
            return GeneralResponse.getResponse(HttpStatus.OK, "Residents assigned!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }
}
