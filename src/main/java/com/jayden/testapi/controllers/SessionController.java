package com.jayden.testapi.controllers;

import com.jayden.testapi.entity.Session;
import com.jayden.testapi.services.SessionService;
import javassist.NotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/sessions")
public class SessionController {

    private final SessionService sessionService;

    public SessionController(SessionService sessionService) {
        this.sessionService = sessionService;
    }

    /*
     *  @GET /api/sessions/all/{userId}
     *  @DESC - Load all sessions for a specific user
     * */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/all")
    public List<Session> getAllSessions(@RequestHeader("authorization") String token) throws NotFoundException {
        return sessionService.getAllSessions(token);
    }

    /*
     *  @GET /api/sessions/{sessionId}
     *  @DESC - Load a single session data using a sessionId
     * */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping(path = "/{sessionId}")
    public ResponseEntity<Session> getSingleSession(@PathVariable("sessionId") Long sessionId) throws NotFoundException {
        return sessionService.getSingleSession(sessionId);
    }

    /*
     *  @PUT /api/sessions/add/{userId}
     *  @DESC - Add a new session and assign the userId to the new session
     * */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping(path = "/add/{userId}")
    public Session addSession(@PathVariable("userId") Long userId, @RequestBody Session session) throws NotFoundException {
        return sessionService.addSession(session, userId);
    }

    /*
     *  @PUT/api/sessions/edit/{sessionId}
     *  @DESC - Edit a session using the sessionId and a new object to apply changes
     * */
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/edit/{sessionId}")
    public HttpStatus editSession(@PathVariable("sessionId") Long sessionId, @RequestBody Session session) throws NotFoundException {
        return sessionService.editSession(sessionId, session);
    }

    /*
     *  @DELETE /api/sessions/delete/{sessionId}
     *  @DESC -Delete a session by ID
     * */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping(path = "/delete/{sessionId}")
    public HttpStatus deleteSession(@PathVariable("sessionId") Long sessionId) throws NotFoundException {
        return sessionService.deleteSession(sessionId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping(path = "/complete/{sessionId}")
    public HttpStatus completeSession(@PathVariable("sessionId") Long sessionId) throws NotFoundException {
        return sessionService.completeSession(sessionId);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/trainer/all/{trainerId}")
    public List<Session> loadAllTrainerSessions(@PathVariable("trainerId") Long trainerId) throws NotFoundException {
        return sessionService.loadAllTrainerSessions(trainerId);
    }

}
