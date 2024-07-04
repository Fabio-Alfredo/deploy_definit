package com.safehouse.safehouse.services.impl;

import com.safehouse.safehouse.domain.dtos.UserDTO;
import com.safehouse.safehouse.domain.dtos.UserLoginDTO;
import com.safehouse.safehouse.domain.models.*;
import com.safehouse.safehouse.repositories.HouseRepository;
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
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    private final JWTTools jwtTools;
    private final TokenRepository tokenRepository;
    private final RestTemplate restTemplate;
    private final UserRepository userRepository;
    private final HouseRepository houseRepository;

    public UserServiceImpl(JWTTools jwtTools, TokenRepository tokenRepository, UserRepository userRepository, RestTemplate restTemplate, HouseRepository houseRepository) {
        this.jwtTools = jwtTools;
        this.tokenRepository = tokenRepository;
        this.restTemplate = restTemplate;
        this.userRepository = userRepository;
        this.houseRepository = houseRepository;
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
    public House getHouseById(UUID id) {
        return houseRepository.getReferenceById(id);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void deleteHouseUser(House house, User user) {
        List<House>houses= user.getHouses();
        houses.remove(house);
        user.setHouses(houses);
        if(user.getHouses().isEmpty()){
            user.getRoles().removeIf(role -> role.getId().contains("RESD"));
        }
        userRepository.save(user);
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
    public void deleteRoles(User user, List<Role> roles) {
        List<Role> rolesUser = user.getRoles();
        rolesUser.removeIf(roles::contains);
        user.setRoles(rolesUser);
        userRepository.save(user);
    }

    @Override
    public void contractEmployee(User user, Role roles) {
        List<Role> userRoles = user.getRoles();
        userRoles.add(roles);
        user.setRoles(userRoles);
        userRepository.save(user);
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


        UserDTO user = new UserDTO();
        user.setName((String)((Map)response.getBody()).get("name"));
        user.setLastname((String)((Map)response.getBody()).get("family_name"));
        user.setEmail((String)((Map)response.getBody()).get("email"));
        user.setPhoto((String)((Map)response.getBody()).get("picture"));
        return user;
    }

    @Override
    public boolean existUserByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public User getByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void createUser(UserDTO user, List<Role>roles) {
        User newUser = new User();
        newUser.setEmail(user.getEmail());
        newUser.setName(user.getName());
        newUser.setPhoto(user.getPhoto());
        newUser.setLastname(user.getLastname());

        newUser.setRoles(roles);
        userRepository.save(newUser);
    }

    @Override
    public List<User> getUsersByRole(List<Role> role) {
        List<User>users = userRepository.findAll();
        users.removeIf(user -> user.getRoles().stream().noneMatch(role::contains));
        return users;
    }

    @Override
    public User findUserAuthenticated() {
        String username = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        return userRepository.findByEmail(username);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<User>getAllUsersByEmail(List<String> emails) {
        return userRepository.findAllByEmailIn(emails);
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void assignHouses(House house, List<User>users, Role role) {

        for (User user : users) {
            List<Role> roles = user.getRoles();
            List<House> houses = user.getHouses();
            if (!user.getHouses().contains(house)) {
                roles.add(role);
                houses.add(house);
                user.setHouses(houses);
                user.setRoles(roles);
                userRepository.save(user);
            }
        }
    }

    //asigna la casa al usuario administrador
    @Override
    @Transactional(rollbackOn = Exception.class)
    public void assignHouseAdmin(User user, House house, Role role) {

        List<House> admHouses = user.getAdmHouse();
        List<Role> userRole = user.getRoles();
        if(!admHouses.contains(house)){
            userRole.add(role);
            admHouses.add(house);
            user.setRoles(userRole);
            user.setAdmHouse(admHouses);
            userRepository.save(user);
        }
    }

    @Override
    public void updateAdminHouse(User newUser,User oldUser, House house, Role role) {
        oldUser.getAdmHouse().removeIf(h -> h.getId().equals(house.getId()));

        if(oldUser.getAdmHouse().isEmpty()){
            oldUser.getRoles().removeIf(r -> r.getId().contains("RSAD"));
        }

       if(newUser !=null){
           List<House> admHouses = newUser.getAdmHouse();
           List<Role> userRole = newUser.getRoles();
           if(admHouses.contains(house)){
               userRole.add(role);
               admHouses.add(house);
               newUser.setRoles(userRole);
               newUser.setAdmHouse(admHouses);
               userRepository.save(newUser);
           }
       }

    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void assignResidentRequest(User user, Request request) {
        List<Request>requests = user.getCreatedRequests();
        if(!user.getCreatedRequests().contains(request)){
            requests.add(request);
            user.setCreatedRequests(requests);
            userRepository.save(user);
        }
    }

    @Override
    @Transactional(rollbackOn = Exception.class)
    public void assignVisitorRequest(User user, Request request) {
        List<Request>requests = user.getRequests();
        if(!user.getRequests().contains(request)){
            requests.add(request);
            user.setRequests(requests);
            userRepository.save(user);
        }
    }

    @Override
    public User createUserAnonymous(String name, String company) {
        User user = new User();
        user.setName(name);
        user.setLastname("Anonymous");
        user.setEmail( name+"@"+company+".com");
        return userRepository.save(user);
    }


}
