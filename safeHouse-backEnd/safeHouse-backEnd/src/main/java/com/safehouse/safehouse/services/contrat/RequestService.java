package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;

import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface RequestService {
    Request createRequest(CreateRequestDTO req, User visitor, User resident, House house);
    List<Request>getAllRequests();
    Boolean existsRequestByHouseAndVisitorAndcreationDate(House house, User visitor, Date enableTme, Date disableTime);
    Request getRequestById(UUID id);
    void updateRequest(Request request);
}
