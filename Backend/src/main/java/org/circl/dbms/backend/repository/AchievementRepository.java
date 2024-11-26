package org.circl.dbms.backend.repository;

import java.util.List;

import org.circl.dbms.backend.model.Achievement;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AchievementRepository extends JpaRepository<Achievement, Integer>{
    List<Achievement> findByUserId(Integer userId);
}
