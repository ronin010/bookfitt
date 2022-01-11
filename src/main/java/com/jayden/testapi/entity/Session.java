package com.jayden.testapi.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity(name = "sessions")
@Table(name = "sessions")
public class Session {

    @Id
    @SequenceGenerator(
        name = "session_sequence",
        sequenceName = "session_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "session_sequence"
    )
    @Column(
        name = "id",
        nullable = false,
        updatable = false
    )
    private Long id;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    // json ignore is used so it doesn't load the user within each sessions object.
    @JsonIgnore
    private Client client;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="trainer_id", referencedColumnName = "id")
    @JsonIgnore
    private Trainer trainer;
    public LocalDate dateBooked;
    public LocalTime timeBooked;
    private String sessionType;
    private Boolean isCompleted;
    private String trainerName;
    private String clientName;

    public Session() {
    }

    public Session(Long id, LocalDate dateBooked, LocalTime timeBooked, String sessionType, Trainer trainer, String trainerName, String clientName) {
        this.id = id;
        this.dateBooked = dateBooked;
        this.timeBooked = timeBooked;
        this.sessionType = sessionType;
        this.trainer = trainer;
        this.isCompleted = false;
        this.trainerName = trainerName;
        this.clientName = clientName;
    }

    public Session(LocalDate dateBooked, LocalTime timeBooked, String sessionType,Trainer trainer, String trainerName, String clientName) {
        this.dateBooked = dateBooked;
        this.timeBooked = timeBooked;
        this.sessionType = sessionType;
        this.trainer = trainer;
        this.isCompleted = false;
        this.trainerName = trainerName;
        this.clientName = clientName;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDateBooked() {
        return dateBooked;
    }

    public void setDateBooked(LocalDate dateBooked) {
        this.dateBooked = dateBooked;
    }

    public LocalTime getTimeBooked() {
        return timeBooked;
    }

    public void setTimeBooked(LocalTime timeBooked) {
        this.timeBooked = timeBooked;
    }

    public String getSessionType() {
        return sessionType;
    }

    public void setSessionType(String sessionType) {
        this.sessionType = sessionType;
    }

    public Trainer getTrainer() {
        return this.trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public Client getClient() {
        return client;
    }

    public void assignClient(Client client) {
        this.client = client;
    }

    public Boolean getIsCompleted() {
        return this.isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }

    public String getTrainerName() {
        return this.trainerName;
    }

    public void setTrainerName(String trainerName) {
        this.trainerName = trainerName;
    }

    public String getClientName() {
        return this.clientName;
    }

    public void setClientName(String clientName) {
        this.clientName = clientName;
    }
}
