package com.safehouse.safehouse.utils;

import com.safehouse.safehouse.domain.models.User;
import com.safehouse.safehouse.services.contrat.UserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.MalformedJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JWTTokenFilter extends OncePerRequestFilter {

    private final JWTTools jwtTools;

    private final UserService userService;

    public JWTTokenFilter(JWTTools jwtTools, UserService userService) {
        this.jwtTools = jwtTools;
        this.userService = userService;
    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String tokenHeader = request.getHeader("Authorization");
        String email = null;
        String token = null;

        if(tokenHeader != null && tokenHeader.startsWith("Bearer ") && tokenHeader.length() > 7) {
            token = tokenHeader.substring(7);

            try {
                email = jwtTools.getUsernameFrom(token);

            } catch (IllegalArgumentException e) {
                System.out.println("Unable to get JWT Token");
            } catch (ExpiredJwtException e) {
                System.out.println("JWT TOKEN has expired");
            } catch (MalformedJwtException e) {
                System.out.println("JWT Malformado");
            }
        } else {
            System.out.println("Bearer string not found");

        }

        if(email != null && token != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            User user = userService.getByEmail(email);
            System.out.println(email);

            if(user != null) {
                Boolean tokenValidity = userService.isTokenValid(user, token);

                if(tokenValidity) {
                    //Preparing the authentication token.
                    UsernamePasswordAuthenticationToken authToken
                            = new UsernamePasswordAuthenticationToken(user.getEmail(), null, user.getAuthorities());


                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    //This line, sets the user to security context to be handled by the filter chain
                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(authToken);
                }
            }
        }

        filterChain.doFilter(request, response);


    }
}
