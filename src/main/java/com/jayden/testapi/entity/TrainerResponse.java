package com.jayden.testapi.entity;

import java.util.List;
import java.util.Set;


public class TrainerResponse {
    
    private Trainer trainer;
    private String token;
    private List<Client> clients;
    private List<Session> sessions;
    
    public TrainerResponse(Trainer trainer, String token, List<Client> clients, List<Session> sessions) {
        this.trainer = trainer;
        this.token = token;
        this.clients = clients;
        this.sessions = sessions;
    }

    public TrainerResponse() {}

    public Trainer getTrainer() {
        return this.trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public String getToken() {
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public List<Client> getClients() {
        return this.clients;
    }

    public void setClients(List<Client> clients) {
        this.clients = clients;
    }

    public List<Session> getSessions() {
        return this.sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }
}
