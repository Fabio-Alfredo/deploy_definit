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
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;

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
    public Request createRequestAnonymous(RequestAnonymousDTO req, House house, User resident, User visitor) {
        Request request = modelMapper.map(req, Request.class);
        request.setCreateAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
        request.setHouse(house);
        request.setVisitor(visitor);
        request.setResident(resident);
        request.setPhase("APPROVED");
        return requestRepository.save(request);
    }

    @Override
    public Map<String, Long> findAllByDay(LocalDate oneWeekAgo) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(r ->r.getEndTime() == null || r.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().isBefore(oneWeekAgo));
        Map<String, Long> requestsByDate = requests.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getDayOfWeek().toString(),
                        Collectors.counting()
                ));
        return requestsByDate;
    }

    @Override
    public Map<String, Long> findAllByMonth(LocalDate oneMonthAgo) {
        List<Request> requests = requestRepository.findAll();
        requests.removeIf(r -> r.getEndTime() == null || r.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().isBefore(oneMonthAgo));

        Map<String, Long> requestsByMonth = requests.stream()
                .collect(Collectors.groupingBy(
                        r -> r.getEndTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().getMonth().toString(),
                        Collectors.counting()
                ));
        return requestsByMonth;
    }

    @Override
    public Request getLastRequest(User user) {
        return requestRepository.findTopByVisitorOrderByCreateAtDesc(user).orElse(null);
    }

}
