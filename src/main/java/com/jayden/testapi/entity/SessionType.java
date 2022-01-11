package com.jayden.testapi.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity(name = "session_types")
@Table(name = "session_types")
public class SessionType {
    @Id
    @SequenceGenerator(
        name = "session_type_sequence",
        sequenceName = "session_type_sequence",
        allocationSize = 1
    )
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "session_type_sequence"
    )
    @Column(
        name = "id",
        nullable = false,
        updatable = false
    )
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "trainer", referencedColumnName = "id")
    @JsonIgnore
    private Trainer trainer;
    private String type;

    public SessionType(Long id, Trainer trainer, String type) {
        this.id = id;
        this.trainer = trainer;
        this.type = type;
    }

    public SessionType(Trainer trainer, String type) {
        this.trainer = trainer;
        this.type = type;
    }

    public SessionType() {}

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Trainer getTrainer() {
        return this.trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
