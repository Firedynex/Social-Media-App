package org.circl.dbms.backend.controller;

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
}
