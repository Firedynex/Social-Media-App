package org.circl.dbms.backend.repository;

import java.util.List;

import org.circl.dbms.backend.model.Attendee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttendeeRepository extends JpaRepository<Attendee, Integer> {
    List<Attendee> findByEventId(int eventId);
}
