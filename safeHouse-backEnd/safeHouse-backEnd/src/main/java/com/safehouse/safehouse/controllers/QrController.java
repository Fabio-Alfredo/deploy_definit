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
import com.safehouse.safehouse.utils.EncryptUtil;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.*;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    private final QrService qrService;
    private final RequestService requestService;
    private final UserService userService;
    private final ModelMapper modelMapper;
    private final RoleService roleService;
    private final EncryptUtil encryptUtil;


    public QrController(QrService qrService, RequestService requestService, UserService userService, ModelMapper modelMapper, RoleService roleService, EncryptUtil encryptUtil) {
        this.qrService = qrService;
        this.requestService = requestService;
        this.userService = userService;
        this.modelMapper = modelMapper;
        this.roleService = roleService;
        this.encryptUtil = encryptUtil;
    }

    @GetMapping("/qr-generate")
    public ResponseEntity<GeneralResponse> generateQr() {
        try {
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);
            ZonedDateTime utcDateTime = ZonedDateTime.now(ZoneId.of("UTC"));
            Date currentDateTime = Date.from(utcDateTime.toInstant());

            QR newQr; Request req;
            User user = userService.findUserAuthenticated();
            if (user == null) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");

            if (user.getRoles().stream().anyMatch(role -> roleService.getRolesById(List.of("RESD", "RSAD")).contains(role))) {
                CreateRequestDTO newReq = userService.createRequestDTO();
                if (user.getRequests().isEmpty()) {
                    requestService.createRequestByRole(newReq, user);
                }
                req = requestService.getLastRequest(user);
                List<QR> qrList = new ArrayList<>(req.getQr());

                if(qrList.isEmpty()) newQr = null;
                else newQr= qrList.get(qrList.size()-1);

                if(newQr == null || newQr.getState().equals("USED")){
                    newQr = qrService.generateQR(req);
                    qrList.add(newQr);
                    req.setQr(qrList);

                }else if(newQr.getLastUpdate().toInstant().isAfter(currentDateTime.toInstant().minusSeconds(600))
                ){
                    newQr = qrService.getQRById(newQr.getId());
                }else{
                    newQr = qrService.updageQR(newQr);;
                }
                modelMapper.map(newReq, req);
                requestService.updateRequest(req);
                String data = newQr.getRequest().getId() + "/"+ newQr.getId()+"/"+ newQr.getLastUpdate();
                String encryptedData = encryptUtil.encrypt(data);
                QRDataDTO qr = new QRDataDTO();
                qr.setQrCode(encryptedData);
                return GeneralResponse.getResponse(HttpStatus.OK, qr);

            }

            List<Request> requests = user.getRequests();
            if (requests.isEmpty()) return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");

            requests.sort(Comparator.comparing(Request::getEnableTme)); newQr = null;
            for (Request r : requests) {
                if (r.getEnableTme().toInstant().isBefore(currentDate) && r.getDisableTime().toInstant().isAfter(currentDate)) {
                    if(!r.getQr().isEmpty() && !r.getEnableTme().equals(r.getCreationDate()) && r.getQr().get(0).getState().equals("USED")){
                        break;
                    }
                    System.out.println(r.getEnableTme());
                    System.out.println(r.getDisableTime());

                    List<QR> qrList =new ArrayList<>(r.getQr());

                    if(!qrList.isEmpty()) newQr= qrList.get(qrList.size()-1);
                    if(newQr == null || newQr.getState().equals("USED")) {
                        newQr = qrService.generateQR(r);
                        qrList.add(newQr);
                        r.setQr(qrList);
                        requestService.updateRequest(r);

                    }else if(newQr.getLastUpdate().toInstant().isAfter(currentDateTime.toInstant().minusSeconds(600))){
                        newQr = qrService.getQRById(newQr.getId());
                    }else{
                        newQr = qrService.updageQR(newQr);
                    }
                    break;
                }
            }
            if (newQr == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "No tines qr disponibles para generar!");
            }
            String data = newQr.getRequest().getId() + "/"+ newQr.getId()+"/"+ newQr.getLastUpdate();
            String encryptedData = encryptUtil.encrypt(data);
            QRDataDTO qr = new QRDataDTO();
            qr.setQrCode(encryptedData);
            return GeneralResponse.getResponse(HttpStatus.OK, qr);
        } catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!" + e.getMessage());
        }

    }

    @PostMapping("/qr-success")
    public ResponseEntity<GeneralResponse> qrSuccess(@RequestBody QRDataDTO data) {

        try {
            Instant instant = Instant.now();
            Instant currentDate = instant.minusSeconds(21600);
//            ZonedDateTime utcDateTime = ZonedDateTime.now(ZoneId.of("UTC"));
//            Date currentDate = Date.from(utcDateTime.toInstant());
            String decryptedData = encryptUtil.decrypt(data.getQrCode());
            String[] qrData = decryptedData.split("/");
            if (qrData.length != 3) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "QR not found!");
            }

            QR qr = qrService.getQR(UUID.fromString(qrData[1]));
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
