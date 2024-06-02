package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;

public interface UserService {

    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;

    UserDTO getUserInformation(String token);
    boolean existUserByEmail(String email);
    User findByEmail(String email);
    void createUser(UserDTO user, Role role);
    User findUserAuthenticated();

}
