package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.RecordDTO;
import com.safehouse.safehouse.domain.dtos.RequestAnonymousDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;
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
            if(req.getEnableTme().toInstant().isBefore(currentDate)){
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

    @PostMapping("/deny")
    public ResponseEntity<GeneralResponse> denyRequest(@RequestParam("id") UUID id) {
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
            if(req.getEnableTme().toInstant().isBefore(currentDate)){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "Request is not valid!");
            }

            req.setPhase("DENIED");
            requestService.updateRequest(req);
            return GeneralResponse.getResponse(HttpStatus.OK, "Request denied!");
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
            if(!user.getRoles().contains(roleService.getRoleById("ADMN"))){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not admin of the house!");
            }

            List<Request> requests = requestService.getAllRequests();
//            Instant instant = Instant.now();
//            Instant currentDate = instant.minusSeconds(21600);
//
            List<Request> pendingRequests = requests.stream()
//                    .filter(request -> request.getHouse().getResidentAdmin().equals(user))
                    .filter(request -> request.getPhase().equals("PENDING"))
//                    .filter(request -> request.getDisableTime().toInstant().isAfter(currentDate))
                    .toList();
            return GeneralResponse.getResponse(HttpStatus.OK, pendingRequests);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @GetMapping("/pending-by-house")
    public ResponseEntity<GeneralResponse> getPendingByHouseRequests() {
        try {
            User user = userService.findUserAuthenticated();
            if(user == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            if(!user.getRoles().contains(roleService.getRoleById("RSAD"))){
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

    @GetMapping("/approved")
    public ResponseEntity<GeneralResponse> getApprovedRequests() {
        try {
            User user = userService.findUserAuthenticated();
            if(user == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            if(!user.getRoles().contains(roleService.getRoleById("ADMN"))){
                return GeneralResponse.getResponse(HttpStatus.FORBIDDEN, "User is not admin of the house!");
            }

            List<Request> requests = requestService.getAllRequests();
//            Instant instant = Instant.now();
//            Instant currentDate = instant.minusSeconds(21600);
//
            List<Request> pendingRequests = requests.stream()
//                    .filter(request -> request.getHouse().getResidentAdmin().equals(user))
                    .filter(request -> request.getPhase().equals("APPROVED"))
//                    .filter(request -> request.getDisableTime().toInstant().isAfter(currentDate))
                    .toList();
            return GeneralResponse.getResponse(HttpStatus.OK, pendingRequests);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @GetMapping("/user-resident")
    public ResponseEntity<GeneralResponse> getRequestsUserResident(@RequestParam(name = "phase", required = false) String phase) {
        try {
            User user = userService.findUserAuthenticated();
            if(user == null || !user.getRoles().contains(roleService.getRoleById("RESD"))){
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

    //para las graficas
    @GetMapping("/by-day")
    public ResponseEntity<GeneralResponse>getRecordEntryByDay(){
        try {
            User user = userService.findUserAuthenticated();
            if(user == null || user.getRoles().stream().noneMatch(role -> role.getId().equals("ADMN"))){
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            LocalDate today = LocalDate.now();
            LocalDate lastMonday = today.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            Map<String, Long> requests = requestService.findAllByDay(lastMonday);

            List<String> daysOfWeek = Arrays.asList("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY");

            List<Map<String, Object>> entriesByDay = daysOfWeek.stream()
                    .map(day -> {
                        Map<String, Object> entry = new HashMap<>();
                        entry.put("name", day);
                        entry.put("entries", requests.getOrDefault(day, 0L));
                        return entry;
                    })
                    .collect(Collectors.toList());

            return GeneralResponse.getResponse(HttpStatus.OK, entriesByDay);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @GetMapping("/by-month")
    public ResponseEntity<GeneralResponse>getRecordEntryByMonth(){
        try {
            User user = userService.findUserAuthenticated();
            if(user == null || user.getRoles().stream().noneMatch(role -> role.getId().equals("ADMN"))){
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            LocalDate today = LocalDate.now();
            LocalDate startOfMonth = today.withDayOfMonth(1);  // Primer día del mes actual
            Map<String, Long> requests = requestService.findAllByMonth(startOfMonth);
            List<String> monthsOfYear = Arrays.asList("JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER");

            List<Map<String, Object>> entriesByMonth = monthsOfYear.stream()
                    .map(month -> {
                        Map<String, Object> entry = new HashMap<>();
                        entry.put("name", month);
                        entry.put("entries", requests.getOrDefault(month, 0L));
                        return entry;
                    })
                    .collect(Collectors.toList());

            return GeneralResponse.getResponse(HttpStatus.OK, entriesByMonth);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }


}
