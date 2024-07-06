package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.CreateRequestDTO;
import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.*;

import java.util.List;
import java.util.UUID;

public interface UserService {

    Token registerToken(User user) throws Exception;
    House getHouseById(UUID id);
    void deleteHouseUser(House house, User user);
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;
    void deleteRoles(User user, List<Role>roles);
    void contractEmployee(User user, Role roles);
    UserDTO getUserInformation(String token);
    boolean existUserByEmail(String email);
    User getByEmail(String email);
    void createUser(UserDTO user, List<Role> roles);
    List<User>getUsersByRole(List<Role> role);
    User findUserAuthenticated();
    List<User>getAllUsers();
    List<User>getAllUsersByEmail(List<String> email);
    void assignHouses(House house, List<User>users, Role role);
    void assignHouseAdmin(User user, House house, Role role);
    void updateAdminHouse(User newUser,User oldUser,  House house, Role role);
    void assignResidentRequest(User user, Request request);
    void assignVisitorRequest(User user, Request request);
    User createUserAnonymous(String name, String company);
    CreateRequestDTO createRequestDTO();
//    void updateUser(User user);
}
