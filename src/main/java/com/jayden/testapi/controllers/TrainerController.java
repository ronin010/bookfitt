package com.jayden.testapi.controllers;

import com.jayden.testapi.entity.Client;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javassist.NotFoundException;

import com.jayden.testapi.entity.ResponseObj;
import com.jayden.testapi.entity.SessionType;
import com.jayden.testapi.entity.Trainer;
import com.jayden.testapi.entity.TrainerResponse;
import com.jayden.testapi.services.TrainerService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(path="api/trainers")
public class TrainerController {

    private final TrainerService trainerService;

    public TrainerController(TrainerService trainerService) {
        this.trainerService = trainerService;
    }

   
    @PostMapping(path = "/add")
    public TrainerResponse addTrainer(@RequestBody Trainer trainer) {
        return trainerService.addTrainer(trainer);
    }
    
   
    @PostMapping(path = "/login")
    public TrainerResponse loginTrainer(@RequestBody Trainer trainer) throws NotFoundException {
        System.out.println(trainer.getEmail());
        return trainerService.loginTrainer(trainer.getEmail(), trainer.getPassword());
    }

    
    @GetMapping(path = "/load")
    public TrainerResponse loadTrainer(@RequestHeader("authorization") String token) throws NotFoundException {
        return trainerService.loadTrainer(token);
    }

    
    @DeleteMapping(path = "/delete/{id}")
    public HttpStatus deleteTrainer(@PathVariable("id")Long id) throws NotFoundException {
        return trainerService.deleteTrainer(id);
    }

   
    @GetMapping(path = "/token")
    public String loadNewToken(@RequestHeader("authorization") String oldToken) {
        return trainerService.signNewTrainerToken(oldToken);
    }

    @PostMapping(path = "/session-type/{id}")
    public SessionType addSessionType(@PathVariable("id") Long id, @RequestBody SessionType sessionType) throws NotFoundException {
        return trainerService.addNewSessionType(id, sessionType);
    }

    @DeleteMapping(path = "/session-type/delete/{id}/{sessionType}")
    public HttpStatus deleteSessionType(@PathVariable("id") Long id, @PathVariable("sessionType") String sessionType) throws NotFoundException {
        return trainerService.deleteSessionType(id, sessionType);
    }

    @GetMapping(path = "/clients/{trainerId}")
    public List<Client> loadClients(@PathVariable("trainerId") Long trainerId) {
        return trainerService.loadClients(trainerId);
    }

    @GetMapping(path = "/session-type/trainers/{sessionType}")
    public List<Trainer> loadTrainersBySessionType(@PathVariable("sessionType") String type) {
        return trainerService.loadAllTrainersBySessionType(type);
    }
}
