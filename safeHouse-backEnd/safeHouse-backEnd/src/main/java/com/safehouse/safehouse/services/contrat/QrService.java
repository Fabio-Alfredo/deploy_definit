package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;

import java.util.Date;
import java.util.UUID;

public interface QrService {
    QR generateQR(Request request);
    Boolean existsByRequest(Request request);
    Boolean connectionESP32();
}
