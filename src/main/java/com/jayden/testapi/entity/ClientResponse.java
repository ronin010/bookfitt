package com.jayden.testapi.entity;

import java.util.Set;

public class ClientResponse {
    private Client client;
    private String token;
    private Trainer trainer;
    private Set<Session> sessions;

    public ClientResponse(Client client, Trainer trainer, String token, Set<Session> sessions) {
        this.client = client;
        this.token = token;
        this.trainer = trainer;
        this.sessions = sessions;
    }

    public Client getClient() {
        return this.client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

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

    public Set<Session> getSessions() {
        return this.sessions;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }
}   
