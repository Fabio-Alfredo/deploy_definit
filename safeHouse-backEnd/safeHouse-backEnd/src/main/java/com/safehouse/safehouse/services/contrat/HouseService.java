package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.CreateHouseDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Request;
import com.safehouse.safehouse.domain.models.User;

import java.util.List;
import java.util.UUID;

public interface HouseService {
    House getHouseById(UUID id);
    void deleteUserHouse(House house, User user);
    House getHouseByAddress(String address);
    Boolean existHouseById(UUID id);
    void createHouse(CreateHouseDTO req);
    List<House>getAllHouses();
    Boolean existHouseByAddress(String address);
    void assignResidents(List<User>residents, House house);
    void assignResidentAdmin(House house, User user);
    Boolean existHouseByAdmin(User admin, String house);
    void assignRequest(House house, Request request);
    Boolean existHouseByUser(House house, User user);
    House getHouseByAdress(String address);
}
