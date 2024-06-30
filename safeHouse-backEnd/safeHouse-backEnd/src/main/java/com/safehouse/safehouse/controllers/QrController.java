package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.QrService;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    private final QrService qrService;
    private final RequestService requestService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final RoleService roleService;


    public QrController(QrService qrService, RequestService requestService, UserService userService, ModelMapper modelMapper, RoleService roleService) {
        this.qrService = qrService;
        this.requestService = requestService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
    }

//    @GetMapping("/qr-generate")
//    public ResponseEntity<GeneralResponse> generateQR() {
//        try {
//
//            Date currentDate = new Date();
//            System.out.println(currentDate);
//            User visitor = userService.findUserAuthenticated();
//            if(visitor == null) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
//            }
//            List<Request> requests = visitor.getRequests();
//            if(requests.isEmpty()) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");
//            }
//            QR newQr = new QR();
//            for(Request req : requests) {
//                if(req.getQr() == null){
//                    System.out.println(req.getEnableTme());
//                    if(!req.getEnableTme().before(currentDate) || !req.getDisableTime().after(currentDate)) {
//
//                        return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
//                    }
//                }
//                if(req.getQr().getState().equals("USED")) {
//                    return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
//                }
//               newQr =  qrService.generateQR(req);
//
//                break;
//            }
//
//            return  GeneralResponse.getResponse(HttpStatus.OK, newQr);
//
//        }catch (Exception e) {
//            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
//        }
//    }

    //TODO: mejor resibir id de request para enviar en base a esa request
    @GetMapping("/qr-generate")
    public ResponseEntity<GeneralResponse> generateQR() {
        try {
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);

            User visitor = userService.findUserAuthenticated();
            if (visitor == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }

            List<Request> requests = visitor.getRequests();
            if (requests.isEmpty()) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");
            }

            QR newQr= null;
            for (Request req : requests) {

                if (req.getQr() == null || !req.getQr().getState().equals("USED")) {
                    if(req.getEnableTme().toInstant().isBefore(currentDate) && req.getDisableTime().toInstant().isAfter(currentDate)) {
                        newQr = qrService.generateQR(req);
                        req.setQr(newQr);
                        requestService.updateRequest(req);
                        break;
                    }
                }
            }

            if (newQr == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "No valid requests found to generate QR!");
            }

            return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));

        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    @GetMapping("/resident/qr-generate")
    public ResponseEntity<GeneralResponse>getQR() {
        try {
            User resident = userService.findUserAuthenticated();
            List<Role> roles = roleService.getRolesById(List.of("RESD", "RSAD"));
            if(resident == null || !new HashSet<>(resident.getRoles()).containsAll(roles)) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            CreateRequestDTO newReq = new CreateRequestDTO();
            newReq.setCreationDate();
            newReq.setReason("QR");
            newReq.setEnableAndDisableTime();
            Request req = requestService.createRequest(newReq, resident, resident, resident.getHouses().get(0));
            QR newQr = qrService.generateQR(req);
            req.setQr(newQr);
            requestService.updateRequest(req);

            return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
        }catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }




    @PostMapping("/qr-success")
    public ResponseEntity<GeneralResponse>qrSuccess(@RequestBody QRDataDTO data) {

        try {

            Instant instant = Instant.now();
//            Instant currentDate = instant.minusSeconds(21600);
            QR qr = qrService.getQR(data.getQrId());
            Request req = requestService.getRequestById(qr.getRequest().getId());
            if(qr==null || req == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "QR not found!");
            }
            if(qr.getState().equals("USED")) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
            }
            System.out.println(req.getEnableTme().toInstant());
            System.out.println(req.getDisableTime().toInstant());
            System.out.println(instant);
            if(!req.getEnableTme().toInstant().isBefore(instant) || !req.getDisableTime().toInstant().isAfter(instant)) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
            }
            qrService.qrUpdate(qr);
            req.setPhase("EXPIRED");
            req.setEndTime(new Date());
            requestService.updateRequest(req);
            //return GeneralResponse.getResponse(HttpStatus.OK, qrService.connectionESP32());
            return GeneralResponse.getResponse(HttpStatus.OK, "QR validado con éxito");

        }catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!"+e.getMessage());
        }
    }

    //primer intento
//    private boolean qrValid = false;
//
//    @GetMapping("/state-qr")
//    public ResponseEntity<Boolean> estadoQR() {
//        return ResponseEntity.ok(qrValid);
//    }

//
    //codigo valido
//    @PostMapping("/qr-success")
//    public ResponseEntity<String> qrSuccess(@RequestBody QRDataDTO data) {
//
//        try {
//            System.out.println(data);
//            if(data.getName().equals("success")) {
//                if(qrService.connectionESP32()){
//                    return ResponseEntity.ok("QR validado con éxito");
//                }
//                else {
//                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//                }
//            } else {
//                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("QR inválido");
//            }
//        }catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
//    }





//    @PostMapping("/generate")
//    public ResponseEntity<GeneralResponse> generateQR(@RequestBody GenerateQrDTO data){
//        try {
//            Request req = requestService.getRequestById(data.getRequest());
//            if(req == null) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Request not found!");
//            }
//
//            if(qrService.existsByRequest(req)) {
//                if(req.getQr().getState().equals("USED")) {
//                    return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
//                }
//                else if(!req.getDisableTime().after(data.getSolicitationDate()) && !req.getEnableTme().before(data.getSolicitationDate())) {
//                    return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
//                }
//                else if(req.getDisableTime().before(data.getSolicitationDate())) {
//                    return GeneralResponse.getResponse(HttpStatus.FOUND, "QR expired!");
//                }
//            }
//
//
//            return GeneralResponse.getResponse(HttpStatus.OK, qrService.generateQR(req));
//        } catch (Exception e) {
//            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
//        }
//    }
}
