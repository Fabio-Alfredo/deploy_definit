package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.QrService;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/qr")
public class QrController {


    private final QrService qrService;
    private final RequestService requestService;
    private final UserService userService;


    public QrController(QrService qrService, RequestService requestService, UserService userService) {
        this.qrService = qrService;
        this.requestService = requestService;
        this.userService = userService;
    }

    @GetMapping("/qr-generate")
    public ResponseEntity<GeneralResponse> generateQR() {
        try {
            Date currentDate = new Date();
            User visitor = userService.findUserAuthenticated();
            if(visitor == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "User not found!");
            }
            List<Request> requests = visitor.getRequests();
            if(requests.isEmpty()) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "Requests not found!");
            }
            QR newQr = new QR();
            for(Request req : requests) {
                if(req.getQr() == null){
                    if(!req.getEnableTme().before(currentDate) || !req.getDisableTime().after(currentDate)) {

                        return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
                    }
                }
                if(req.getQr().getState().equals("USED")) {
                    return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
                }
               newQr =  qrService.generateQR(req);

                break;
            }

            return  GeneralResponse.getResponse(HttpStatus.OK, newQr);

        }catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
        }
    }

    @PostMapping("/qr-success")
    public ResponseEntity<GeneralResponse>qrSuccess(@RequestBody QRDataDTO data) {

        try {
            Date currentDate = new Date();
            QR qr = qrService.getQR(data.getQrId(), data.getLastUpdate());
            Request req = requestService.getRequestById(qr.getRequest().getId());
            if(qr==null || req == null) {
                return GeneralResponse.getResponse(HttpStatus.NOT_FOUND, "QR not found!");
            }
            if(qr.getState().equals("USED")) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR already used!");
            }
            if(!req.getEnableTme().before(currentDate) || !req.getDisableTime().after(currentDate)) {
                return GeneralResponse.getResponse(HttpStatus.FOUND, "QR not available!");
            }

            return GeneralResponse.getResponse(HttpStatus.OK, qrService.connectionESP32());

        }catch (Exception e) {
            return GeneralResponse.getResponse(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error!");
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
