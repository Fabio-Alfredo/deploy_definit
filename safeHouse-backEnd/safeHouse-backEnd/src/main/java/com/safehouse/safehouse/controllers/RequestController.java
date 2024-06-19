package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    private final RequestService requestService;
    private final UserService userService;
    private final HouseService houseService;

    public RequestController(RequestService requestService, UserService userService, HouseService houseService) {
        this.requestService = requestService;
        this.userService = userService;
        this.houseService = houseService;
    }

    @PostMapping("/new")
    public ResponseEntity<GeneralResponse> createRequest(@RequestBody CreateRequestDTO req) {
        try {
            User visitor = userService.getByEmail(req.getVisitor());
            User resident = userService.getByEmail(req.getResident());
            House hose = houseService.getHouseById(req.getHouse());
            if(visitor == null || resident == null || hose == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User or house not found!");
            }
            //Obtiene fecha de incio de qr y fecha de fin
            req.setEnableAndDisableTime();
            //valida que el usuario no sea invitado de nuevo dentro del rango de la invitacion anterior
            if(requestService.existsRequestByHouseAndVisitorAndcreationDate(hose, visitor, req.getEnableTme(), req.getDisableTime())) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "Request already exists!");
            }

            //validar que el usuario sea residente de la casa, y alguna otra
            if(!userService.existUserByHouse(List.of(hose), resident)){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not resident of the house!");
            }
            Request reque = requestService.createRequest(req, visitor, resident, hose);

            if(reque == null) {
                return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
            }
            houseService.assignRequest(hose, reque);
            userService.assignResidentRequest(resident, reque);

            return GeneralResponse.getResponse(HttpStatus.OK, "Request created!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<GeneralResponse> getAllRequests() {
        try {
            return GeneralResponse.getResponse(HttpStatus.OK, requestService.getAllRequests());
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }
}
