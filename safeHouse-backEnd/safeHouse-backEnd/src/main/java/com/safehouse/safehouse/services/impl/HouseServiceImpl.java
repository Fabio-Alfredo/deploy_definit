package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.CreateHouseDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.HouseRepository;
import com.safehouse.safehouse.services.contrat.HouseService;
import com.safehouse.safehouse.services.contrat.UserService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HouseServiceImpl implements HouseService {

    private final HouseRepository houseRepository;
    private final ModelMapper modelMapper;

    public HouseServiceImpl(HouseRepository houseRepository, ModelMapper modelMapper) {
        this.houseRepository = houseRepository;
        this.modelMapper = modelMapper;

    }

    @Override
    public House getHouseById(UUID id) {
        return houseRepository.findById(id).orElse(null);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteUserHouse(House house, User user) {
        List<User> users = house.getUsers();
        users.remove(user);
        house.setUsers(users);
        houseRepository.save(house);
    }

    @Override
    public House getHouseByAddress(String address) {
        return houseRepository.findByAddress(address).orElse(null);
    }

    @Override
    public Boolean existHouseById(UUID id) {
        return houseRepository.existsById(id);
    }

    @Override
    public void createHouse(CreateHouseDTO req) {
        House house = modelMapper.map(req, House.class);
        houseRepository.save(house);
    }

    @Override
    public List<House> getAllHouses() {
        return houseRepository.findAll();
    }

    @Override
    public Boolean existHouseByAddress(String address) {
        return houseRepository.existsByAddress(address);
    }

    @Override
    public void assignResidents(List<User> residents, House house) {
        house.setUsers(residents);
        houseRepository.save(house) ;
    }

    //asigna un administrador a una casa
    @Override
    public void assignResidentAdmin(House house, User user) {

        house.setResidentAdmin(user);
        houseRepository.save(house);


    }

    @Override
    public Boolean existHouseByAdmin(User admin, String house) {
        return houseRepository.existsByResidentAdminAndAddress(admin, house);
    }

    @Override
    public void assignRequest(House house, Request request) {
        List<Request>requests = house.getRequests();
        if(house.getRequests().contains(request)){
            requests.add(request);
            houseRepository.save(house);
        }
    }

    @Override
    public Boolean existHouseByUser(House house, User user) {
        return null;
    }

    @Override
    public House getHouseByAdress(String address) {
        return houseRepository.findByAddress(address).orElse(null);
    }
}
