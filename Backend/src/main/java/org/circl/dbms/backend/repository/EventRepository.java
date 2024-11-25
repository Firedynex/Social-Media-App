package org.circl.dbms.backend.repository;

import java.util.List;

import org.circl.dbms.backend.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Integer>{
    List<Event> findByUserId(Integer userId);
}
