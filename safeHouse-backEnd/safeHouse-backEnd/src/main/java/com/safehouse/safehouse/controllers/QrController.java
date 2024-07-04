package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.QrService;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.RoleService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.*;

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

    @GetMapping("/qr-generate")
    public ResponseEntity<GeneralResponse> generateQr() {
        try {
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);

            User user = userService.findUserAuthenticated();
            if (user == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");

            if (user.getRoles().stream().anyMatch(role -> roleService.getRolesById(List.of("RESD", "RSAD")).contains(role))) {
                if (user.getRequests().isEmpty()) {
                    CreateRequestDTO newReq = new CreateRequestDTO();
                    newReq.setCreationDate();
                    newReq.setEnableAndDisableTime();
                    newReq.setReason("Entrar a mi casa");
                    QR newQr;
                    Request req;
                    if(user.getRoles().contains(roleService.getRoleById("RESD"))){
                         req = requestService.createRequest(newReq, user, user, user.getHouses().get(0));
                    }else{
                        req = requestService.createRequest(newReq, user, user, user.getAdmHouse().get(0));
                    }
                    newQr = qrService.generateQR(req);
                    List<QR> qrList = new ArrayList<>(req.getQr());
                    qrList.add(newQr);
                    req.setQr(qrList);
                    requestService.updateRequest(req);
                    return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
                } else {
                    Request req = requestService.getLastRequest(user);
                    List<QR> qrList = new ArrayList<>(req.getQr());

                    QR newQr= qrList.get(qrList.size()-1);
                    if(newQr.getState().equals("USED")){
                        newQr = qrService.generateQR(req);
                        qrList.add(newQr);
                        req.setQr(qrList);
                        requestService.updateRequest(req);
                    }else{
                        QR qr = qrService.updageQR(newQr);
                        return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(qr, QRDataDTO.class));
                    }


                    return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
                }
            }

            List<Request> requests = user.getRequests();
            if (requests.isEmpty()) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");

            QR newQr = null;
            for (Request req : requests) {

                if (req.getEnableTme().toInstant().isBefore(currentDate) && req.getDisableTime().toInstant().isAfter(currentDate)) {
                    newQr = qrService.generateQR(req);
                    List<QR> qrList = req.getQr();
                    qrList.add(newQr);
                    req.setQr(qrList);
                    requestService.updateRequest(req);
                    break;
                }
            }

            if (newQr == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "No valid requests found to generate QR!");
            }

            return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));

        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" + e.getMessage());
        }

    }

    @PostMapping("/qr-success")
    public ResponseEntity<GeneralResponse> qrSuccess(@RequestBody QRDataDTO data) {

        try {

            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);
            QR qr = qrService.getQR(data.getQrId());
            Request req = requestService.getRequestById(qr.getRequest().getId());
            if (qr == null || req == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "QR not found!");
            }
            if (qr.getState().equals("USED")) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
            }

            if (!req.getEnableTme().toInstant().isBefore(currentDate) || !req.getDisableTime().toInstant().isAfter(currentDate)) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
            }
            //validar si aun no han pasado 10 minutos
//            System.out.println(qr.getLastUpdate().before(Date.from(Instant.now().minusSeconds(600) )));
            if (qr.getLastUpdate().before(Date.from(Instant.now().minusSeconds(600)))) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR expired!");
            }
            qrService.usageQr(qr);
            req.setPhase("EXPIRED");
            req.setEndTime(new Date());
            requestService.updateRequest(req);
            //return GeneralResponse.getResponse(HttpStatus.OK, qrService.connectionESP32());
            return GeneralResponse.getResponse(HttpStatus.OK, "QR validado con éxito");

        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" + e.getMessage());
        }
    }

}

//    //TODO: mejor resibir id de request para enviar en base a esa request
//    @GetMapping("/qr-generate")
//    public ResponseEntity<GeneralResponse> generateQR() {
//        try {
//            Instant instant = Instant.now();
//            Instant currentDate = instant.minusSeconds(21600);
//
//            User visitor = userService.findUserAuthenticated();
//            if (visitor == null) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
//            }
//
//            List<Request> requests = visitor.getRequests();
//            if (requests.isEmpty()) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");
//            }
//
//            QR newQr = null;
//            for (Request req : requests) {
//
//                if (req.getEnableTme().toInstant().isBefore(currentDate) && req.getDisableTime().toInstant().isAfter(currentDate)) {
//                    newQr = qrService.generateQR(req);
//                    List<QR> qrList = req.getQr();
//                    qrList.add(newQr);
//                    req.setQr(qrList);
//                    requestService.updateRequest(req);
//                    break;
//                }
//            }
//
//            if (newQr == null) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "No valid requests found to generate QR!");
//            }
//
//            return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
//
//        } catch (Exception e) {
//            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" + e.getMessage());
//        }
//    }
//
//    @GetMapping("/resident/qr-generate")
//    public ResponseEntity<GeneralResponse> getQR() {
//        try {
//            User resident = userService.findUserAuthenticated();
//            List<Role> roles = roleService.getRolesById(List.of("RESD", "RSAD"));
//            List<Role> userRoles = resident.getRoles();
//
//            if (resident == null || Collections.disjoint(roles, userRoles)) {
//                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
//            }
//
//            CreateRequestDTO newReq = new CreateRequestDTO();
//            newReq.setCreationDate();
//            newReq.setEnableAndDisableTime();
//            newReq.setReason("QR");
//            QR newQr;
//
//            Request request = requestService.getLastRequest(resident);
//            if (request != null && !request.getPhase().equals("EXPIRED")) {
//                request.setCreationDate(newReq.getCreationDate());
//                request.setEnableTme(newReq.getEnableTme());
//                request.setDisableTime(newReq.getDisableTime());
//                newQr = qrService.generateQR(request);
//                request.setQr(newQr);
//
//                requestService.updateRequest(request);
//                return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
//            }
//            Request req = requestService.createRequest(newReq, resident, resident, resident.getHouses().get(0));
//            newQr = qrService.generateQR(req);
//            req.setQr(newQr);
//            requestService.updateRequest(req);
//            return GeneralResponse.getResponse(HttpStatus.OK, modelMapper.map(newQr, QRDataDTO.class));
//        } catch (Exception e) {
//            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" + e.getMessage());
//        }
//    }
