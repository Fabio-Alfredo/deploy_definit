package com.safehouse.safehouse.controllers;

import com.safehouse.safehouse.domain.dtos.GeneralResponse;
import com.safehouse.safehouse.domain.dtos.GenerateQrDTO;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.services.contrat.QrService;
import com.safehouse.safehouse.services.contrat.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/qr")
public class QrController {

    private final QrService qrService;
    private final RequestService requestService;

    public QrController(QrService qrService, RequestService requestService) {
        this.qrService = qrService;
        this.requestService = requestService;
    }

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
