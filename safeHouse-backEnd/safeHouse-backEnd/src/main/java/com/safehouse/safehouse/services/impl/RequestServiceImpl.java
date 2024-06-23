package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.RequestAnonymousDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.RequestRepository;
import com.safehouse.safehouse.services.contrat.RequestService;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
public class RequestServiceImpl implements RequestService{

    private final RequestRepository requestRepository;
    private final ModelMapper modelMapper;

    public RequestServiceImpl(RequestRepository requestRepository, ModelMapper modelMapper) {
        this.requestRepository = requestRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Request createRequest(CreateRequestDTO req, User visitor, User resident, House house) {
        Request request = modelMapper.map(req, Request.class);
        request.setCreateAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        request.setVisitor(visitor);
        request.setResident(resident);
        request.setHouse(house);
        request.setPhase("PENDING");
        return requestRepository.save(request);
    }

    @Override
    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    @Override
    public Boolean existsRequestByHouseAndVisitorAndcreationDate(House house, User visitor, Date enableTme, Date disableTime) {
        return requestRepository.existsByHouseAndVisitorAndCreationDateBetween(house, visitor, enableTme, disableTime);
    }

    @Override
    public Request getRequestById(UUID id) {
        return requestRepository.getReferenceById(id);
    }

    @Override
    public void updateRequest(Request request) {
        requestRepository.save(request);
    }

    @Override
    public List<Request> getAllRequestsByResident(User resident) {
        return requestRepository.findAllByResident(resident);
    }

    @Override
    public List<Request> getAllRequestsByResidentAndPhase(User resident, String phase) {
        return requestRepository.findAllByResidentAndPhase(resident, phase);
    }

    @Override
    public Request createRequestAnonymous(RequestAnonymousDTO req, House house) {
        Request request = modelMapper.map(req, Request.class);
        return requestRepository.save(request);
    }
}
