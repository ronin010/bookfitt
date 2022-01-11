package com.jayden.testapi.services;

import com.jayden.testapi.Util.*;
import com.jayden.testapi.entity.Client;
import com.jayden.testapi.entity.ResponseObj;
import com.jayden.testapi.entity.Session;
import com.jayden.testapi.entity.SessionType;
import com.jayden.testapi.entity.Trainer;
import com.jayden.testapi.entity.TrainerResponse;
import com.jayden.testapi.repositories.SessionRepository;
import com.jayden.testapi.repositories.SessionTypeRepository;
import com.jayden.testapi.repositories.TrainerRepository;
import com.jayden.testapi.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import javassist.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class TrainerService {
    
    private final TrainerRepository trainerRepository;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final SessionRepository sessionRepository;
    private final SessionTypeRepository sessionTypeRepository;

    public TrainerService(TrainerRepository trainerRepository, JwtUtil jwtUtil, UserRepository userRepository, SessionRepository sessionRepository, SessionTypeRepository sessionTypeRepository) {
        this.trainerRepository = trainerRepository;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.sessionRepository = sessionRepository;
        this.sessionTypeRepository = sessionTypeRepository;
    }

    public TrainerResponse addTrainer(Trainer trainer) {
        Optional<Trainer> trainerByEmail = trainerRepository.findTrainerByEmail(trainer.getEmail());

        if (trainerByEmail.isPresent()) {
            throw new EmailTakenException("A trainer with that email already exists");
        }

        trainer.setPassword(passwordEncoder.encode(trainer.getPassword()));
        trainerRepository.save(trainer);

        List<Client> clients = userRepository.findClientsByTrainerId(trainer.getId());

        return new TrainerResponse(
            trainer, 
            jwtUtil.sign(
                trainer.getId(),
                trainer.getEmail(),
                "trainer"
            ),
            clients,
            new ArrayList<>()
        );
    }

    public TrainerResponse loginTrainer(String email, String password) throws NotFoundException {
        Optional<Trainer> trainerByEmail = trainerRepository.findTrainerByEmail(email);

        if (trainerByEmail.isEmpty()) {
            throw new EmailNotFoundException("A user with that email does not exist");
        }

        if (!passwordEncoder.matches(password, trainerByEmail.get().getPassword())) {
            throw new IncrorrectPasswordException("Incorrect Password");
        }

        Trainer trainer = trainerByEmail.get();

        List<Client> clients = userRepository.findClientsByTrainerId(trainer.getId());
        List<Session> sessions = sessionRepository.findAllSessionsForTrainer(trainer.getId());
        
        return new TrainerResponse(
            trainer,
            jwtUtil.sign(trainer.getId(), email, "trainer"),
            clients,
            sessions
        );
    }

    public TrainerResponse loadTrainer(String token) {

        // extract claims and attempt to load a trainer
        Jws<Claims> claims = jwtUtil.extractClaims(token);

        Long id = claims.getBody().get("id", Long.class);

        Optional<Trainer> trainerById = trainerRepository.findById(id);

        Trainer trainer = trainerById.get();

        List<Client> clients = userRepository.findClientsByTrainerId(trainer.getId());

        List<Session> sessions = sessionRepository.findAllSessionsForTrainer(trainer.getId());

        return new TrainerResponse(
            trainer,
            this.signNewTrainerToken(token),
            clients,
            sessions
        );
    }

    public HttpStatus deleteTrainer(Long id) throws NotFoundException {
        trainerRepository.deleteById(id);
        return HttpStatus.OK;
    }

    public String signNewTrainerToken(String oldToken) {
        // check if token is valid
        Jws<Claims> claims = jwtUtil.extractClaims(oldToken);

        String email = claims.getBody().get("email", String.class);
        
        Optional<Trainer> trainer = trainerRepository.findTrainerByEmail(email);

        if (trainer.isEmpty()) {
            throw new InvalidTokenException("Invalid Token Present");
        }

        // generate new token
        return jwtUtil.sign(
            trainer.get().getId(), 
            trainer.get().getEmail(),
            "trainer"
        );
    }

    // add a new sessionType (used for users to select which sessionType they want to book.
    public SessionType addNewSessionType(Long trainerId, SessionType sessionType) throws NotFoundException {
        Optional<Trainer> trainer = trainerRepository.findById(trainerId);

        Optional<SessionType> sessionTypeByType = sessionTypeRepository.sessionTypeByTypeAndTrainerId(sessionType.getType(), trainerId);

        if (sessionTypeByType.isPresent()) {
            throw new SessionTypesException("A session type with that name already exists");
        }

        List<SessionType> sessionTypes = sessionTypeRepository.sessionTypesByTrainerId(trainerId);

        if (sessionTypes.size() == 6) {
            throw new SessionTypesException("You may only have up to 6 session types per trainer");
        }

        sessionType.setTrainer(trainer.get());
        sessionType.setType(sessionType.getType().toLowerCase());
        sessionTypeRepository.save(sessionType);

        return sessionType;
    }
    
    public HttpStatus deleteSessionType(Long trainerId, String type) throws NotFoundException {
        sessionTypeRepository.deleteSessionType(trainerId, type);
        return HttpStatus.OK;
    }

    public List<Client> loadClients(Long trainerId) {

        List<Client> clients = userRepository.findClientsByTrainerId(trainerId);

        for (Client client : clients) {
            client.setPassword("");
        }

        return clients;
    }

    public List<Trainer> loadAllTrainersBySessionType(String sessionType) {
        List<SessionType> types = sessionTypeRepository.loadAllBySessionType(sessionType.toLowerCase());
        List<Trainer> trainers = new ArrayList<Trainer>();

        for (SessionType type : types) {
            type.getTrainer().setPassword("");
            trainers.add(type.getTrainer());
        }

        return trainers;
    } 
}
