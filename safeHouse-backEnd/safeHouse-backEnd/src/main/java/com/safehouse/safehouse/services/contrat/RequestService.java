package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.User;

public interface RequestService {
    void createRequest(CreateRequestDTO req, User visitor, User resident, House house);

}
