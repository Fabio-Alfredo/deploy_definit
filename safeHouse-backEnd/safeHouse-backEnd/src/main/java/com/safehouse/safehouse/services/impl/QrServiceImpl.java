package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.repositories.QrRepository;
import com.safehouse.safehouse.services.contrat.QrService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    private final QrRepository qrRepository;
    private final RestTemplate restTemplate;
    private final ModelMapper modelMapper;

    public QrServiceImpl(QrRepository qrRepository, RestTemplate restTemplate, ModelMapper modelMapper) {
        this.qrRepository = qrRepository;
        this.restTemplate = restTemplate;
        this.modelMapper = modelMapper;
    }

    @Override
    public QR generateQR(Request request) {
        QR qr = new QR();
        qr.setRequest(request);
        qr.setLastUpdate(new Date());
        qr.setState("PENDING");


        return qrRepository.save(qr);
    }

    @Override
    public QR getQR(UUID qrId) {
        return qrRepository.findById(qrId).orElse(null);
    }

    @Override
    public Boolean existsByRequest(Request request) {
        return qrRepository.existsByRequest(request);
    }

    @Override
    public Boolean connectionESP32() {
        String esp32Url = "http://192.168.1.15:80/allow_entry";

        // Enviar la solicitud POST al ESP32
        ResponseEntity<String> response = restTemplate.postForEntity(esp32Url, null, String.class);

        return response.getStatusCode().is2xxSuccessful();
    }

    @Override
    public void usageQr(QR qr) {
        qr.setUsedAt(Date.from(Instant.now()));
        qr.setState("USED");
        qrRepository.save(qr);
    }

    @Override
    public QR getQRById(UUID qrId) {
        return qrRepository.findById(qrId).orElse(null);
    }

    @Override
    public QR updageQR(QR qr) {
        qr.setLastUpdate(new Date());
        return qrRepository.save(qr);
    }

    @Override
    public List<QR> getQrByState(String state) {
        return qrRepository.findAllByState(state);
    }


}
