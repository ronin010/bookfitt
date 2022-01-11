package com.jayden.testapi.services;

import com.jayden.testapi.Util.DateTakenException;
import com.jayden.testapi.Util.InvalidDateException;
import com.jayden.testapi.Util.JwtUtil;
import com.jayden.testapi.entity.Session;
import com.jayden.testapi.entity.SessionType;
import com.jayden.testapi.entity.Trainer;
import com.jayden.testapi.entity.Client;
import com.jayden.testapi.repositories.SessionRepository;
import com.jayden.testapi.repositories.TrainerRepository;
import com.jayden.testapi.repositories.UserRepository;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.beans.BeanUtils;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class SessionService {

    private final SessionRepository sessionRepository;
    private final UserRepository userRepository;
    private final TrainerRepository trainerRepository;
    private final JwtUtil jwtUtil;

    public SessionService(SessionRepository sessionRepository, UserRepository userRepository, JwtUtil jwtUtil, TrainerRepository trainerRepository) {
        this.sessionRepository = sessionRepository;
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
        this.trainerRepository = trainerRepository;
    }

    public List<Session> getAllSessions(String token) throws NotFoundException {
        Jws<Claims> claims = jwtUtil.extractClaims(token);

        Long userId = claims.getBody().get("id", Long.class);

        // check if user exists before retrieving sessions
        Optional<Client> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new NotFoundException("A user with id: " + userId + " does not exist.");
        }

        List<Session> sessions = sessionRepository.findAllSessionsById(userId);

        // complete sessions if they are today and the time has gone 
        // or if the date is in the past
        for (Session s : sessions) {
            if (s.getDateBooked().equals(LocalDate.now()) 
            && s.getTimeBooked().isBefore(LocalTime.now()) && !s.getIsCompleted()) 
            {
                this.completeSession(s.getId());
            } else if (s.getDateBooked().isBefore(LocalDate.now()) && !s.getIsCompleted()) {
                this.completeSession(s.getId());
            }
        }

        return sessionRepository.findAllSessionsById(userId);
    }

    // Return a single session
    public ResponseEntity<Session> getSingleSession(Long sessionId) throws NotFoundException {
        // check if session exists
        Optional<Session> session = sessionRepository.findById(sessionId);

        if (session.isEmpty()) {
            throw new NotFoundException("A session with ID " + sessionId + " does not exist.");
        }

        return new ResponseEntity<>(session.get(), HttpStatus.OK);
    }

    // Add a new session and return a HTTP status code
    public Session addSession(Session session, Long userId) throws NotFoundException, DateTakenException, InvalidDateException {
        // check if user exists
        Optional<Client> user = userRepository.findById(userId);

        if (user.isEmpty()) {
            throw new NotFoundException("A user with ID " + userId + " does not exist.");
        }

        Trainer trainer = user.get().getTrainer();

        List<Session> sessionsByDate = sessionRepository.findSessionByDateBooked(session.getDateBooked());

        if (!sessionsByDate.isEmpty()) {
            for (Session s : sessionsByDate) {
                if (s.getTimeBooked() == session.getTimeBooked()) {
                    throw new DateTakenException("The time you have selected is already booked, please try a different time.");
                }
            }
        }

        LocalDate now = LocalDate.now();

        if (session.dateBooked.isBefore(now) && !session.dateBooked.equals(now)) {
            throw new InvalidDateException("Please Select A date in the future");
        } 

        Client client = user.get();

        // assign user to the new session then save the session
        session.assignClient(client);
        session.setTrainer(trainer);
        session.setTrainerName(trainer.getFirstName() + " " + trainer.getLastName());
        session.setIsCompleted(false);
        session.setClientName(client.getFirstName() + " " + client.getLastName());
        sessionRepository.save(session);

        Optional<Session> newSession = sessionRepository.findById(session.getId());

        if (newSession.isEmpty()) {
            throw new InternalError("Internal Server Error");
        }

        return newSession.get();
    }

    // Edit a session and return a HTTP status code
    public HttpStatus editSession(Long sessionId, Session updateSession) throws NotFoundException {
        Optional<Session> session = sessionRepository.findById(sessionId);

        if (session.isEmpty()) {
            throw new NotFoundException("A session with ID " + sessionId + " does not exist.");
        }

        BeanUtils.copyProperties(updateSession, session.get(), "id");
        sessionRepository.save(session.get());
        return HttpStatus.OK;
    }

    // Delete a session and return a HTTP status code
    public HttpStatus deleteSession(Long sessionId) throws NotFoundException {
        // check if session exists
        Optional<Session> session = sessionRepository.findById(sessionId);

        if (session.isEmpty()) {
            throw new NotFoundException("A Session With ID " + sessionId + " does not exist.");
        }

        // clear user so it doesn't delete the user
        session.get().assignClient(null);

        // delete session
        sessionRepository.deleteSession(session.get().getId());
        return HttpStatus.OK;
    }

    public HttpStatus completeSession(Long id) throws NotFoundException {

        Optional<Session> session = sessionRepository.findById(id);

        if (session.isEmpty()) {
            throw new NotFoundException("A Session With that ID does not exist.");
        }

        // then increment completed sessions and completed hours for user
        // every session is 2 hours so we increment the hours by 2
        // the sessions are incremented by 1 however
        Client user = session.get().getClient();

        // check if the user exists
        Optional<Client> userObj = userRepository.findById(user.getId());

        if (userObj.isEmpty()) {
            throw new NotFoundException("A user with that ID does not exist.");
        }

        // update the user to increment the values after a completed session and then delete the session
        userRepository.updateClient(
            userObj.get().getSessionsCompleted() + 1, 
            userObj.get().getHoursCompleted() + 2, 
            userObj.get().getId()
        );

        session.get().setIsCompleted(true);
        sessionRepository.save(session.get());

        return HttpStatus.OK;
    }

    public List<Session> loadAllTrainerSessions(Long trainerId) throws NotFoundException {
        Optional<Trainer> trainer = trainerRepository.findById(trainerId);

        if (trainer.isEmpty()) {
            throw new NotFoundException("A user with that ID does not exist");
        }

        return sessionRepository.findAllSessionsForTrainer(trainerId);
    }
}
