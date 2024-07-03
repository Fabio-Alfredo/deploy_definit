package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.*;
import com.safehouse.safehouse.domain.models.*;
import com.safehouse.safehouse.services.contrat.*;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/request")
public class RequestController {
    private final RequestService requestService;
    private final UserService userService;
    private final HouseService houseService;
    private final ModelMapper modelMapper;
    private final RoleService roleService;

    public RequestController(RequestService requestService, UserService userService, HouseService houseService, ModelMapper modelMapper, RoleService roleService) {
        this.requestService = requestService;
        this.userService = userService;
        this.houseService = houseService;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
    }

    @PostMapping("/new/casual")
    public ResponseEntity<GeneralResponse> createRequest(@RequestBody CreateRequestDTO req) {
        try {
            User visitor = userService.getByEmail(req.getVisitor());
            User resident = userService.findUserAuthenticated();
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

            //validar que el usuario sea residente de la casa
            if(!hose.getUsers().contains(resident) && !hose.getResidentAdmin().equals(resident)){
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

    @PostMapping("/approve")
    public ResponseEntity<GeneralResponse> approveRequest(@RequestParam("id") UUID id) {
        try {
            Request req = requestService.getRequestById(id);
            User user = userService.findUserAuthenticated();
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);
            if(req == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Request not found!");
            }

            if(!req.getHouse().getResidentAdmin().equals(user)) {
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not admin of the house!");
            }
            if(req.getEnableTme().toInstant().isAfter(currentDate)){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "Request is not valid!");
            }

            req.setPhase("APPROVED");
            userService.assignVisitorRequest(req.getVisitor(), req);
            requestService.updateRequest(req);
            return GeneralResponse.getResponse(HttpStatus.OK, "Request approved!");
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @GetMapping("/pending")
    public ResponseEntity<GeneralResponse> getPendingRequests() {
        try {
            User user = userService.findUserAuthenticated();
            if(user == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            if(user.getRoles().stream().noneMatch(role -> role.getId().equals("RSAD"))){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not admin of the house!");
            }

            List<Request> requests = requestService.getAllRequests();
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);

            List<Request> pendingRequests = requests.stream()
                    .filter(request -> request.getHouse().getResidentAdmin().equals(user))
                    .filter(request -> request.getPhase().equals("PENDING"))
                    .filter(request -> request.getDisableTime().toInstant().isAfter(currentDate))
                    .toList();
            return GeneralResponse.getResponse(HttpStatus.OK, pendingRequests);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @GetMapping("/requests/user-resident")
    public ResponseEntity<GeneralResponse> getRequestsUserResident(@RequestParam(name = "phase", required = false) String phase) {
        try {
            User user = userService.findUserAuthenticated();
            if(user == null || user.getRoles().stream().noneMatch(role -> role.getId().equals("RESD"))){
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            List<Request> requests = new ArrayList<>();
            if(phase == null) requests = requestService.getAllRequestsByResident(user);
            else requests = requestService.getAllRequestsByResidentAndPhase(user, phase);
            return GeneralResponse.getResponse(HttpStatus.OK, requests);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }


    @PostMapping("/entry-anonymous")
    public ResponseEntity<GeneralResponse> entryAnonymous(@RequestBody RequestAnonymousDTO req) {
        try {
            User employee = userService.findUserAuthenticated();
            if(employee == null || employee.getRoles().stream().noneMatch(role -> role.getId().equals("EMPL"))){
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            req.setEnableAndDisableTime();
            House house = houseService.getHouseByAddress(req.getHouse());
            if(house == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "House not found!");
            }
            User resident = house.getResidentAdmin();
            User emp = userService.createUserAnonymous(req.getName(), req.getCompany());
            Request reque = requestService.createRequestAnonymous(req, house, resident, emp);

            if(reque == null) {
                return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error jfajdfk!");
            }
            houseService.assignRequest(house, reque);

            return GeneralResponse.getResponse(HttpStatus.OK, "Request created!");


        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @GetMapping("/record")
    public ResponseEntity<GeneralResponse>getRecordEntry(){
        try {
            User user = userService.findUserAuthenticated();
            if(user == null || user.getRoles().stream().noneMatch(role -> role.getId().equals("ADMN"))){
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            List<Request> requests = requestService.getAllRequests();
            requests.removeIf(r -> r.getQr() == null || !r.getQr().getState().equals("USED") || !r.getPhase().equals("EXPIRED"));
            List<RecordDTO> reqs = requests.stream().map(request -> modelMapper.map(request, RecordDTO.class)).collect(Collectors.toList());
            return GeneralResponse.getResponse(HttpStatus.OK, reqs);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @PostMapping("/create/multirequest")
    public ResponseEntity<GeneralResponse> createMultipleRequest(@RequestBody RequestMultipleDTO req){
        try {
            User resident = userService.findUserAuthenticated();
            if (resident == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }

            House house = houseService.getHouseById(resident.getHouses().get(0).getId());

            if(house == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "House not found!");
            }

            if(resident.getRoles().contains(roleService.getRoleById("RESD"))){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not resident of the house!");
            }
            User visitor = userService.getByEmail(req.getVisitor());







            return null;
        }catch (Exception e){
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }
}
