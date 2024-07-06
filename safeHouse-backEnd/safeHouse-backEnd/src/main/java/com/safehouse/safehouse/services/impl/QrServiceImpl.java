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
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

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

        ZonedDateTime zdt = ZonedDateTime.now(ZoneId.of("UTC"));
        ZonedDateTime time = zdt.minusHours(6);
        Date currenDate = Date.from(time.toInstant());

        qr.setUsedAt(currenDate);
        qr.setState("USED");
        qrRepository.save(qr);
    }

    @Override
    public Map<String, Long> findAllByDay(LocalDate oneWeekAgo) {
        List<QR> qrs = qrRepository.findAll();
        qrs.removeIf(r ->r.getUsedAt() == null || r.getUsedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().isBefore(oneWeekAgo));
        Map<String, Long> requestsByDate = qrs.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getUsedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfWeek().toString(),
                        Collectors.counting()
                ));
        return requestsByDate;
    }

    @Override
    public Map<String, Long> findAllByMonth(LocalDate oneMonthAgo) {
        List<QR> qrs = qrRepository.findAll();
        qrs.removeIf(r -> r.getUsedAt() == null );

        Map<String, Long> requestsByMonth = qrs.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getUsedAt().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonth().toString(),
                        Collectors.counting()
                ));
        return requestsByMonth;

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
