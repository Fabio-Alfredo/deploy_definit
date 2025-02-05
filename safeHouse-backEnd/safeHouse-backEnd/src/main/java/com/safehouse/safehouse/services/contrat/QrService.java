package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.models.QR;
import com.safehouse.safehouse.domain.models.Request;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface QrService {
    QR generateQR(Request request);
    QR getQR(UUID qrId);
    Boolean existsByRequest(Request request);
    Boolean connectionESP32();
    void usageQr(QR qr);
    Map<String, Long> findAllByDay(LocalDate oneWeekAgo);
    Map<String, Long>findAllByMonth(LocalDate oneMonthAgo);
    QR getQRById(UUID qrId);
    QR updageQR(QR qr);
    List<QR> getQrByState(String state);

}
