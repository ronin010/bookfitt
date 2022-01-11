package com.jayden.testapi.repositories;

import java.util.Optional;
import com.jayden.testapi.entity.Trainer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
    Optional<Trainer> findTrainerByEmail(String email);
}
