package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.services.contrat.QrService;
import com.safehouse.safehouse.services.contrat.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/qr")
public class QrController {


    private final QrService qrService;
    private final RequestService requestService;


    public QrController(QrService qrService, RequestService requestService ) {
        this.qrService = qrService;
        this.requestService = requestService;
    }

//    private boolean qrValid = false;
//
//    @GetMapping("/state-qr")
//    public ResponseEntity<Boolean> estadoQR() {
//        return ResponseEntity.ok(qrValid);
//    }


    @PostMapping("/qr-success")
    public ResponseEntity<String> qrSuccess(@RequestBody QRDataDTO data) {

        try {
            System.out.println(data);
            if(data.getName().equals("success")) {
                if(qrService.connectionESP32()){
                    return ResponseEntity.ok("QR validado con éxito");
                }
                else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("QR inválido");
            }
        }catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

//    @PostMapping("/validar-qr")
//    public ResponseEntity<Void> validarQR(@RequestBody QRDataDTO qrRequest) {
//        if (qrRequest.getName().equals("codigo_valido")) {
//            qrValid = true;
//            return ResponseEntity.ok().build();
//        } else {
//            System.out.println("QR inválido");
//            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
//
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
