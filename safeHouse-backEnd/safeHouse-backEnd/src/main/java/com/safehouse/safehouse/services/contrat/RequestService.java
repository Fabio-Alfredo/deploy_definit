package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.RequestAnonymousDTO;
import com.safehouse.safehouse.domain.dtos.RequestMultipleDTO;
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
    List<Request>getAllRequestsByResident(User resident);
    List<Request>getAllRequestsByResidentAndPhase(User resident, String phase);
    Request createRequestAnonymous(RequestAnonymousDTO req, House house, User resident, User visitor);
    void createMultipleRequest(RequestMultipleDTO req, House house, User resident, User visitor);
}
