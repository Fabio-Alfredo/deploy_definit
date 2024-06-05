package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.Role;
import com.safehouse.safehouse.domain.models.Token;
import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.repositories.RoleRepository;
import com.safehouse.safehouse.repositories.TokenRepository;
import com.safehouse.safehouse.repositories.UserRepository;
import com.safehouse.safehouse.services.contrat.UserService;
import com.safehouse.safehouse.utils.JWTTools;
import jakarta.transaction.Transactional;
import org.springframework.http.*;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {

    private final JWTTools jwtTools;
    private final TokenRepository tokenRepository;
    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public UserServiceImpl(JWTTools jwtTools, TokenRepository tokenRepository, UserRepository userRepository, RestTemplate restTemplate, RoleRepository roleRepository) {
        this.jwtTools = jwtTools;
        this.tokenRepository = tokenRepository;
        this.restTemplate = restTemplate;
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
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

    @Override
    public UserDTO getUserInformation(String token) {
        //System.out.println("Token: " + token.getToken());

        String url = "https://www.googleapis.com/oauth2/v1/userinfo?access_token="+token;
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);
        headers.set("Content-Type", "application/json");
        HttpEntity<String> requestEntity = new HttpEntity<>(null, headers);
        ResponseEntity<Object> response =  restTemplate.exchange(url, HttpMethod.GET, requestEntity, Object.class);

        if(response.getStatusCode() != HttpStatus.OK){
            throw new RuntimeException("Failed to retrieve user information from Google OAuth API");
        }
        System.out.println(requestEntity);

        UserDTO user = new UserDTO();
        user.setName((String)((Map)response.getBody()).get("name"));
        user.setLastname((String)((Map)response.getBody()).get("family_name"));
        user.setEmail((String)((Map)response.getBody()).get("email"));
        return user;
    }

    @Override
    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void createUser(UserDTO user, List<String>roles) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setLastname(user.getLastname());

        List<Role> newRole=roleRepository.findAllById(roles);
        newUser.setRoles(newRole);
        userRepository.save(newUser);
    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(username);
    }
}
