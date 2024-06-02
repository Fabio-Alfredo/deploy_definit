package com.safehouse.safehouse.services.contrat;

import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;

public interface UserService {

    Token registerToken(User user) throws Exception;
    Boolean isTokenValid(User user, String token);
    void cleanTokens(User user) throws Exception;
}
