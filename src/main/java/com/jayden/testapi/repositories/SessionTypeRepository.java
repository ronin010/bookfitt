package com.jayden.testapi.repositories;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import com.jayden.testapi.entity.SessionType;
import com.jayden.testapi.entity.Trainer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface SessionTypeRepository extends JpaRepository<SessionType, Long> {

    Optional<SessionType> findSessionTypeByType(String type);

    @Query("SELECT st FROM session_types st WHERE st.type = :type AND st.trainer.id = :id")
    Optional<SessionType> sessionTypeByTypeAndTrainerId(@Param("type") String type, @Param("id") Long id);

    @Query("SELECT st FROM session_types st WHERE st.type = :type")
    List<SessionType> loadAllBySessionType(@Param("type") String type);

    @Query("SELECT st FROM session_types st WHERE st.trainer.id = :id")
    List<SessionType> sessionTypesByTrainerId(Long id);
    
    @Transactional
    @Modifying
    @Query("DELETE FROM session_types st WHERE st.type = :type AND st.trainer.id = :id")
    void deleteSessionType(@Param("id") Long id, @Param("type") String type);
}
