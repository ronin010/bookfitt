package com.jayden.testapi.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.HashSet;
import java.util.Set;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "clients")
@Table(
    name = "clients",
    uniqueConstraints = {
        @UniqueConstraint(name = "client_email", columnNames = "email")
    }
)
public class Client {
    @Id
    @SequenceGenerator(
        name = "client_sequence",
        sequenceName = "client_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "client_sequence"
    )
    private Long id;

    @OneToMany(mappedBy = "client", cascade = CascadeType.ALL)
    private Set<Session> sessions = new HashSet<>();

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "trainer_id", referencedColumnName = "id")
    private Trainer trainer;
    private Integer sessionsCompleted;
    private Integer hoursCompleted;

    private String firstName;
    private String lastName;
    @Column(name = "email")
    private String email;
    private String password;
    private String mobileNumber;
    private String accountPrivacy;

    public Client() {
    }

    public Client(Long id, Set<Session> sessions, Trainer trainer, Integer sessionsCompleted, Integer hoursCompleted, String firstName, String lastName, String email, String password, String mobileNumber,  String accountPrivacy) {
        this.id = id;
        this.sessions = sessions;
        this.trainer = trainer;
        this.sessionsCompleted = sessionsCompleted;
        this.hoursCompleted = hoursCompleted;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.accountPrivacy = accountPrivacy;
    }

    public Client(Set<Session> sessions, Trainer trainer, Integer sessionsCompleted, Integer hoursCompleted, String firstName, String lastName, String email, String password, String mobileNumber,  String accountPrivacy) {
        this.sessions = sessions;
        this.trainer = trainer;
        this.sessionsCompleted = sessionsCompleted;
        this.hoursCompleted = hoursCompleted;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.accountPrivacy = accountPrivacy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
    
    @JsonIgnore
    public Set<Session> getSessions() {
        return this.sessions;
    }

    public Integer getSessionsCompleted() {
        return this.sessionsCompleted;
    }

    public void setSessionsCompleted(Integer sessionsCompleted) {
        this.sessionsCompleted = sessionsCompleted;
    }

    public Integer getHoursCompleted() {
        return this.hoursCompleted;
    }

    public void setHoursCompleted(Integer hoursCompleted) {
        this.hoursCompleted = hoursCompleted;
    }

    public Trainer getTrainer() {
        return this.trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public void setSessions(Set<Session> sessions) {
        this.sessions = sessions;
    }


    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getMobileNumber() {
        return mobileNumber;
    }

    public void setMobileNumber(String mobileNumber) {
        this.mobileNumber = mobileNumber;
    }

    public String getAccountPrivacy() {
        return this.accountPrivacy;
    }

    public void setAccountPrivacy(String accountPrivacy) {
        this.accountPrivacy = accountPrivacy;
    }
}
