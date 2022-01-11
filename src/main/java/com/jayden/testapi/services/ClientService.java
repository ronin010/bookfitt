package com.jayden.testapi.services;

import com.jayden.testapi.Util.EmailNotFoundException;
import com.jayden.testapi.Util.EmailTakenException;
import com.jayden.testapi.Util.IncrorrectPasswordException;
import com.jayden.testapi.Util.InvalidTokenException;
import com.jayden.testapi.Util.JwtUtil;
import com.jayden.testapi.entity.ResponseObj;
import com.jayden.testapi.entity.Session;
import com.jayden.testapi.entity.Client;
import com.jayden.testapi.entity.ClientResponse;
import com.jayden.testapi.entity.Trainer;
import com.jayden.testapi.repositories.SessionRepository;
import com.jayden.testapi.repositories.TrainerRepository;
import com.jayden.testapi.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Optional;

@Service
public class ClientService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;
    //private final SessionRepository sessionRepository;
    private final TrainerRepository trainerRepository;
    private final SessionService sessionService;

    public ClientService(UserRepository userRepository, JwtUtil jwtUtil, SessionRepository sessionRepository, TrainerRepository trainerRepository, SessionService sessionService) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        //this.sessionRepository = sessionRepository;
        this.trainerRepository = trainerRepository;
        this.sessionService = sessionService;
    }

    public ClientResponse loginUser(String email, String password) throws NotFoundException {
        // attempt to find user by email
        Optional<Client> user = userRepository.findClientByEmail(email);

        if (user.isEmpty()) {
            throw new EmailNotFoundException("A user with that email does not exist.");
        }

        // compare passwords
        if (!passwordEncoder.matches(password, user.get().getPassword())) {
            throw new IncrorrectPasswordException("Incorrect Password");
        }


        for (Session s : user.get().getSessions()) {
            if (s.getDateBooked().equals(LocalDate.now()) 
            && s.getTimeBooked().isBefore(LocalTime.now()) && !s.getIsCompleted()) 
            {
                sessionService.completeSession(s.getId());
            } else if (s.getDateBooked().isBefore(LocalDate.now()) && !s.getIsCompleted()) {
                sessionService.completeSession(s.getId());
            }
        }

        // clear password from object and send response
        user.get().setPassword("");
        return new ClientResponse(
            user.get(), 
            user.get().getTrainer(),
            jwtUtil.sign(
                user.get().getId(), 
                user.get().getEmail(),
                "client"
            ),
            user.get().getSessions()
        );
    }

    public ClientResponse addUser(Client user) throws EmailTakenException {
        // check if email is taken by another client account
        Optional<Client> userByEmail = userRepository.findClientByEmail(user.getEmail());

        // check if email is taken by a trainer account
        Optional<Trainer> trainerByEmail = trainerRepository.findTrainerByEmail(user.getEmail());

        if (userByEmail.isPresent() || trainerByEmail.isPresent()) {
            throw new EmailTakenException("A user with that email already exists.");
        }

         // set default values
         user.setHoursCompleted(0);
         user.setSessionsCompleted(0);

        // hash password and save user
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);

        return new ClientResponse(
            user,
            user.getTrainer(), 
            jwtUtil.sign(
                user.getId(), 
                user.getEmail(),
                "client"
            ),
            user.getSessions()
        );
    }
    
    public ClientResponse loadUser(String token) throws NotFoundException {
        Jws<Claims> claims = jwtUtil.extractClaims(token);

        Long id = claims.getBody().get("id", Long.class);

        Optional<Client> user = userRepository.findById(id);

        if (user.isEmpty()) {
            throw new EmailNotFoundException("A user with that email does not exist.");
        }

        for (Session s : user.get().getSessions()) {
            if (s.getDateBooked().equals(LocalDate.now()) 
            && s.getTimeBooked().isBefore(LocalTime.now()) && !s.getIsCompleted()) 
            {
                sessionService.completeSession(s.getId());
            } else if (s.getDateBooked().isBefore(LocalDate.now()) && !s.getIsCompleted()) {
                sessionService.completeSession(s.getId());
            }
        }

        // clear password hash from object
        user.get().setPassword("");

        // return an object containing the user, a new token and the sessions data
        return new ClientResponse(
            user.get(), 
            user.get().getTrainer(),
            jwtUtil.sign(user.get().getId(), user.get().getEmail(), "client"),
            user.get().getSessions()
        );
    }

    public HttpStatus assignTrainer(Long userId, Long trainerId) throws NotFoundException {
        // check if user and trainer exist
        Optional<Client> client = userRepository.findById(userId);
        Optional<Trainer> trainer = trainerRepository.findById(trainerId);

        client.get().setTrainer(trainer.get());

        userRepository.save(client.get());

        return HttpStatus.OK;
    }

    public String signNewClientToken(String oldToken) {
        // check if token is valid
        Jws<Claims> claims = jwtUtil.extractClaims(oldToken);

        String email = claims.getBody().get("email", String.class);
        
        Optional<Client> client = userRepository.findClientByEmail(email);

        if (client.isEmpty()) {
            throw new InvalidTokenException("Invalid Token Present");
        }

        return jwtUtil.sign(
            client.get().getId(), 
            client.get().getEmail(),
            "client"
        );
    }

    public HttpStatus deleteUser(Long userId) throws NotFoundException {
        Optional<Client> client = userRepository.findById(userId);

        userRepository.delete(client.get());
        return HttpStatus.OK;
    }

    public String setAccountPrivacy(Long id, String type) throws NotFoundException {
        userRepository.setAccountPrivacy(id, type);
        return type;
    }
} 
