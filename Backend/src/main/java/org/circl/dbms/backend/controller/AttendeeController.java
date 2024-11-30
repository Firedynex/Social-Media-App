package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.AttendeeDto;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.AttendeeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendees")
public class AttendeeController {

    private final AttendeeService attendeeService;

    @PostMapping
    public ResponseEntity<Response> addAttendee(@RequestBody AttendeeDto attendeeDto) {
        return ResponseEntity.ok(attendeeService.addAttendee(attendeeDto));
    }

    @GetMapping("/event/{eventId}")
    public ResponseEntity<List<AttendeeDto>> getAttendeesByEvent(@PathVariable int eventId) {
        List<AttendeeDto> attendees = attendeeService.getAttendeesByEvent(eventId);
        return ResponseEntity.ok(attendees);
    }
}
