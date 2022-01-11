package com.jayden.testapi.repositories;

import com.jayden.testapi.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

@Repository
public interface UserRepository extends JpaRepository<Client, Long> {
    Optional<Client> findClientByEmail(String email);

    @Modifying
    @Transactional
    @Query("update clients u set u.sessionsCompleted = ?1, u.hoursCompleted = ?2 where u.id = ?3")
    void updateClient(Integer sessionsCompleted, Integer hoursCompleted, Long id);

    @Transactional
    @Query("SELECT c from clients c where c.trainer.id = :id")
    List<Client> findClientsByTrainerId(@Param("id") Long id);

    @Transactional
    @Modifying
    @Query("update clients c set c.accountPrivacy = :accountPrivacy where c.id = :id")
    void setAccountPrivacy(@Param("id") Long id, @Param("accountPrivacy") String accountPrivacy);
}
