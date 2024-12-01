package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.AttendeeDto;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.AttendeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

/**
 * Controller class to handle REST endpoints for the attendees functionality of the app.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/attendees")
public class AttendeeController {

    private final AttendeeService attendeeService;

    /**
     * Adds an attendee to the database for a specific event.
     * @param attendeeDto Request body that specifies all the details for an attendee.
     * @return A response entity that states whether an attendee was successfully created or not.
     */
    @PostMapping
    public ResponseEntity<Response> addAttendee(@RequestBody AttendeeDto attendeeDto) {
        return ResponseEntity.ok(attendeeService.addAttendee(attendeeDto));
    }

    /**
     * Gets all the attendees for a specific event.
     * @param eventId Used to search for a specific event.
     * @return All of the attendees for the specific event.
     */
    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<AttendeeDto>> getAttendeesByEvent(@PathVariable int eventId) {
        List<AttendeeDto> attendees = attendeeService.getAttendeesByEvent(eventId);
        return ResponseEntity.ok(attendees);
    }
}
