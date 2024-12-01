package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.AttendeeDto;
import org.circl.dbms.backend.model.Attendee;
import org.circl.dbms.backend.model.Event;
import org.circl.dbms.backend.repository.AttendeeRepository;
import org.circl.dbms.backend.repository.EventRepository;
import org.circl.dbms.backend.response.Response;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for attendees system.
 */
@Service
@RequiredArgsConstructor
public class AttendeeService {

    private final AttendeeRepository attendeeRepository;
    private final EventRepository eventRepository;

    /**
     * Creates and adds an attendee to the database.
     * @param attendeeDto Body for the attendee object.
     * @return Response on whether the attendee was successfully added to the database or not.
     */
    public Response addAttendee(AttendeeDto attendeeDto) {
        Event event = eventRepository.findById(attendeeDto.getEventId())
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        Attendee attendee = Attendee.builder()
                .firstName(attendeeDto.getFirstName())
                .lastName(attendeeDto.getLastName())
                .guestCount(attendeeDto.getGuestCount())
                .event(event)
                .build();

        try {
            attendeeRepository.save(attendee);

            // Update the attendee count in the Event
            event.setAttendeeCount(event.getAttendeeCount() + attendeeDto.getGuestCount());
            eventRepository.save(event);
            return new Response(true, "Attendee Successfully Added!");
        } catch (Exception e) {
            return new Response(false, "Error adding attendee");
        }
    }

    /**
     * Gets all the attendees for a specific event.
     * @param eventId Id for the event.
     * @return List of all the attendees for the event.
     */
    public List<AttendeeDto> getAttendeesByEvent(int eventId) {
        return attendeeRepository.findByEventId(eventId)
                .stream()
                .map(attendee -> AttendeeDto.builder()
                        .firstName(attendee.getFirstName())
                        .lastName(attendee.getLastName())
                        .guestCount(attendee.getGuestCount())
                        .eventId(eventId)
                        .build())
                .collect(Collectors.toList());
    }
}
