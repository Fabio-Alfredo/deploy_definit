package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.TokenRepository;
import com.safehouse.safehouse.services.contrat.UserService;
import com.safehouse.safehouse.utils.JWTTools;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final JWTTools jwtTools;
    private final TokenRepository tokenRepository;

    public UserServiceImpl(JWTTools jwtTools, TokenRepository tokenRepository) {
        this.jwtTools = jwtTools;
        this.tokenRepository = tokenRepository;
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public Token registerToken(User user) throws Exception {
        cleanTokens(user);

        String tokenString = jwtTools.generateToken(user);
        Token token = new Token(tokenString, user);

        tokenRepository.save(token);

        return token;
    }

    @Override
    public Boolean isTokenValid(User user, String token) {
        try {
            cleanTokens(user);
            List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

            tokens.stream()
                    .filter(tk -> tk.getContent().equals(token))
                    .findAny()
                    .orElseThrow(() -> new Exception());

            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void cleanTokens(User user) throws Exception {
        List<Token> tokens = tokenRepository.findByUserAndActive(user, true);

        tokens.forEach(token -> {
            if(!jwtTools.verifyToken(token.getContent())) {
                token.setActive(false);
                tokenRepository.save(token);
            }
        });

    }
}
