package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.House;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;

import java.util.List;

public interface UserService {

    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;

    UserDTO getUserInformation(String token);
    boolean existUserByEmail(String email);
    User getByEmail(String email);
    void createUser(UserDTO user, List<Role> roles);
    User findUserAuthenticated();
    List<User>getAllUsers();
    List<User>getAllUsersByEmail(List<String> email);
    void assignHouses(House house, List<User>users, Role role);
    void assignHouseAdmin(User user, House house, Role role);


//    void updateUser(User user);
}
