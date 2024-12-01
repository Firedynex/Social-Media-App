package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.EventDto;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * Handles the REST endpoints for the events functionality for the app.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {
    
    private final EventService eventService;

    /**
     * Gets all the events for a specific user.
     * @param email Email used to search for the user.
     * @return A response entity with all the events for a specific user.
     */
    @GetMapping("/{email}")
    public ResponseEntity<List<EventDto>> getEventsByUser(@PathVariable String email) {
        List<EventDto> events = eventService.getEventsByUser(email);
        return ResponseEntity.ok(events);
    }

    /**
     * Creates an event in the database.
     * @param eventDto Request body for the event to be saved.
     * @return A response entity with the response of whether an event was successfully saved in the database or not.
     */
    @PostMapping
    public ResponseEntity<Response> createEvent(@RequestBody EventDto eventDto) {
        return ResponseEntity.ok(eventService.saveEvent(eventDto.getEmail(), eventDto.getStartDate(), eventDto.getEndDate(), eventDto.getLocation(), eventDto.getDescription(), eventDto.getTitle()));
    }    

    /**
     * Gets all the events in the database regardless of user.
     * @return All the events in the database.
     */
    @GetMapping("/getall")
    public ResponseEntity<List<EventDto>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
}
