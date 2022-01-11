package com.jayden.testapi.entity;

import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@JsonIgnoreProperties({"hibernateLazyInitializer"})
@Entity(name = "trainers")
@Table(
        name = "trainers",
        uniqueConstraints = {
                @UniqueConstraint(name = "trainer_email", columnNames = "email")
        }
)
public class Trainer {
    @Id
    @SequenceGenerator(
        name = "trainer_sequence",
        sequenceName = "trainer_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "trainer_sequence"
    )
    @Column(
        name = "id",
        nullable = false,
        updatable = false
    )
    private Long id;

    @OneToMany(mappedBy = "trainer")
    private Set<Session> sessions = new HashSet<>();

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    
    private Set<SessionType> sessionTypes = new HashSet<>();

    private String firstName;
    private String lastName;
    @Column(name = "email")
    private String email;
    private String password;
    private String mobileNumber;
    private String accountPrivacy;

    public Trainer( Long id, Set<Session> sessions,Set<SessionType> sessionTypes, String firstName, String lastName, String email, String password, String mobileNumber, String accountPrivacy) {
        this.id = id;
        this.sessions = sessions;
        this.sessionTypes = sessionTypes;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.accountPrivacy = accountPrivacy;

    }

    public Trainer( Set<Session> sessions, Set<SessionType> sessionTypes, String firstName, String lastName, String email, String password, String mobileNumber, String accountPrivacy) {
        this.sessions = sessions;
        this.sessionTypes = sessionTypes;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.mobileNumber = mobileNumber;
        this.accountPrivacy = accountPrivacy;
    }

    public Trainer() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Session> getSessions() {
        return sessions;
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

    public Set<SessionType> getSessionTypes() {
        return sessionTypes;
    }

    public void setSessionTypes(Set<SessionType> sessionTypes) {
        this.sessionTypes = sessionTypes;
    }

    public String getAccountPrivacy() {
        return this.accountPrivacy;
    }

    public void setAccountPrivacy(String accountPrivacy) {
        this.accountPrivacy = accountPrivacy;
    }
}
