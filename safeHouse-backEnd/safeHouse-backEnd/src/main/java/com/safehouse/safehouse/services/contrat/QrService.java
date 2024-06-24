package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.QRDataDTO;
import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;

import java.util.Date;
import java.util.UUID;

public interface QrService {
    QRDataDTO generateQR(Request request);
    QR getQR(UUID qrId, Date lastUpdate);
    Boolean existsByRequest(Request request);
    Boolean connectionESP32();
}
