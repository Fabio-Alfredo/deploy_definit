package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.RequestRepository;
import com.safehouse.safehouse.services.contrat.RequestService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;

@Service
public class RequestServiceImpl implements RequestService{

    private final RequestRepository requestRepository;
    private final ModelMapper modelMapper;

    public RequestServiceImpl(RequestRepository requestRepository, ModelMapper modelMapper) {
        this.requestRepository = requestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public void createRequest(CreateRequestDTO req, User visitor, User resident, House house) {
        Request request = modelMapper.map(req, Request.class);
        request.setCreateAt(Date.from(Instant.now()));
        request.setVisitor(visitor);
        request.setResident(resident);
        request.setHouse(house);
        request.setPhase("PENDING");
        requestRepository.save(request);
    }
}
