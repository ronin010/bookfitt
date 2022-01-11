package com.jayden.testapi.repositories;

import com.jayden.testapi.entity.Session;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import javax.transaction.Transactional;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
    @Transactional
    @Modifying
    @Query("DELETE FROM sessions s WHERE s.id = :sessionId")
    void deleteSession(@Param("sessionId") Long sessionId);

    @Transactional
    @Query("SELECT s FROM sessions s WHERE s.client.id = :userId")
    List<Session> findAllSessionsById(@Param("userId") Long userId);

    @Transactional
    @Query("SELECT s FROM sessions s WHERE s.dateBooked = :dateBooked")
    List<Session> findSessionByDateBooked(@Param("dateBooked") LocalDate dateBooked);
    
    @Modifying
    @Transactional
    @Query("UPDATE sessions s SET s.dateBooked = :dateBooked, s.timeBooked = :timeBooked, s.sessionType = :sessionType WHERE s.id = :sessionId")
    void updateSessions(
        @Param("dateBooked") LocalDate dateBooked, 
        @Param("timeBooked") LocalTime timeBooked, 
        @Param("sessionType") String sessionType, 
        @Param("sessionId") Long sessionId
    );

    @Transactional
    @Query("SELECT s FROM sessions s WHERE trainer.id = :trainerId")
    List<Session> findAllSessionsForTrainer(@Param("trainerId") Long trainerId);
}