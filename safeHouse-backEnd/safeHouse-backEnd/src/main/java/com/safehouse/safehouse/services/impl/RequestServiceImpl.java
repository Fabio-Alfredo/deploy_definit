package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.RequestAnonymousDTO;
import com.safehouse.safehouse.domain.dtos.RequestMultipleDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.RequestRepository;
import com.safehouse.safehouse.services.contrat.RequestService;
import com.safehouse.safehouse.services.contrat.RoleService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class RequestServiceImpl implements RequestService {

    private final RoleService roleService;
    private final RequestRepository requestRepository;
    private final ModelMapper modelMapper;

    public RequestServiceImpl(RoleService roleService, RequestRepository requestRepository, ModelMapper modelMapper) {
        this.roleService = roleService;
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
    @Transactional
    public List<Request> createMultipleRequest(RequestMultipleDTO req, House house, User resident, User visitor) {

        List<Request> requestList = new ArrayList<>();

        for(int i = 0; i < req.getEnableTme().size(); i++){

            Request request = new Request();

            request.setResident(resident);
            request.setVisitor(visitor);
            if (resident.getRoles().contains(roleService.getRoleById("RSAD"))) {
                request.setPhase("APPROVED");
            }else {
                request.setPhase("PENDING");
            }
            request.setHouse(house);
            request.setReason(req.getReason());
            request.setCreateAt(Date.from(LocalDateTime.now().atZone(ZoneId.systemDefault()).toInstant()));
            request.setCreationDate(req.getEnableTme().get(i));
            request.setEnableTme(req.getEnableTme().get(i));
            request.setDisableTime(req.getDisableTime().get(i));

            requestList.add(requestRepository.save(request));
        }

        return requestList;
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
        requests.removeIf(r -> r.getEndTime() == null );

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

    @Override
    public List<Request> getAllRequestsByVisitor(User visitor) {
        return requestRepository.findAllByVisitor(visitor);
    }

}
