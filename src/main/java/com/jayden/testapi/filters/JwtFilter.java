package com.jayden.testapi.filters;

import com.jayden.testapi.Util.InvalidTokenException;
import com.jayden.testapi.Util.JwtUtil;
import com.jayden.testapi.entity.Client;
import com.jayden.testapi.entity.Trainer;
import com.jayden.testapi.repositories.TrainerRepository;
import com.jayden.testapi.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.MalformedJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
@Configuration
@Order(1)
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final List<String> authenticate_patterns = List.of(
            "/api/users/add",
            "/api/users/login",
            "/api/sessions/add",
            "/api/trainers/add",
            "/api/trainers/login"
    );

    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil, UserRepository userRepository, TrainerRepository trainerRepository) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.trainerRepository = trainerRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        // only do JWT checks on URLs that require tokens.
        if (!authenticate_patterns.contains(request.getRequestURI())) {

            // if no token is provided then throw an exception
            if (token == null) {
                throw new InvalidTokenException("403 Forbidden - no token present");
            }

            // attempt to extract claims from a provided token
            // if it does not work, then the token is invalid and an exception will be thrown
            try {
                // access the claims and then the user id from the claims
                Jws<Claims> claims = jwtUtil.extractClaims(token);
                Long id = claims.getBody().get("id", Long.class);
                String accountType = claims.getBody().get("accountType", String.class);

                if (accountType.equals("client")) {
                    Optional<Client> user = userRepository.findById(id);

                    // if the user is empty, then the id within the token claims is invalid
                    if (user.isEmpty()) {
                        throw new InvalidTokenException("Invalid Token Present");
                    }
                } else if (accountType.equals("trainer")) {
                    Optional<Trainer> trainer = trainerRepository.findById(id);

                    if (trainer.isEmpty()) {
                        throw new InvalidTokenException("Invalid Token Present");
                    }
                }
            } catch(MalformedJwtException e) {
                throw new InvalidTokenException("Invalid Token");
            }
        }

        filterChain.doFilter(request, response);
    }
}
