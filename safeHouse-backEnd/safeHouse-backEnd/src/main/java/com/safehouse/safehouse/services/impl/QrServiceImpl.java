package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.repositories.QrRepository;
import com.safehouse.safehouse.services.contrat.QrService;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class QrServiceImpl implements QrService {

    private final QrRepository qrRepository;

    public QrServiceImpl(QrRepository qrRepository) {
        this.qrRepository = qrRepository;
    }

    @Override
    public QR generateQR(Request request) {
        QR qr = new QR();
        qr.setRequest(request);
        qr.setState("PENDING");

        return qrRepository.save(qr);
    }

    @Override
    public Boolean existsByRequest(Request request) {
        return qrRepository.existsByRequest(request);
    }
}
