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
    public QRDataDTO generateQR(Request request) {
        QR qr = new QR();
        qr.setRequest(request);
        qr.setLastUpdate(new Date());
        qr.setState("PENDING");
        qrRepository.save(qr);

        return modelMapper.map(qr, QRDataDTO.class);
    }

    @Override
    public QR getQR(UUID qrId, Date lastUpdate) {
        return qrRepository.findByIdAndLastUpdate(qrId, lastUpdate).orElse(null);
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
}
