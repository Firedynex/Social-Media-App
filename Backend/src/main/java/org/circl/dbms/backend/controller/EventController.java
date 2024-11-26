package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.EventDto;
import org.circl.dbms.backend.model.Event;
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

@RestController
@RequiredArgsConstructor
@RequestMapping("/events")
public class EventController {
    
    private final EventService eventService;

    @GetMapping("/{email}")
    public ResponseEntity<List<EventDto>> getEventsByUser(@PathVariable String email) {
        List<EventDto> events = eventService.getEventsByUser(email);
        return ResponseEntity.ok(events);
    }

    @PostMapping
    public ResponseEntity<Response> createEvent(@RequestBody EventDto eventDto) {
        return ResponseEntity.ok(eventService.saveEvent(eventDto.getEmail(), eventDto.getStartDate(), eventDto.getEndDate(), eventDto.getLocation(), eventDto.getDescription(), eventDto.getTitle()));
    }    

    @GetMapping("/getall")
    public ResponseEntity<List<Event>> getAllEvents() {
        return ResponseEntity.ok(eventService.getAllEvents());
    }
}
