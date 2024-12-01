package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.EventDto;
import org.circl.dbms.backend.model.Event;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.EventRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.circl.dbms.backend.response.Response;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for events.
 */
@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    /**
     * Creates and saves an event into the database.
     * @param email Email for the author (user) of the event.
     * @param startDate Start date of the event.
     * @param endDate End date of the event.
     * @param location Location of the event.
     * @param description Description of the event.
     * @param title Title of the event.
     * @return Response on whether the event was successfully saved to the database or not.
     */
    public Response saveEvent(String email, String startDate, String endDate, String location, String description, String title) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        Event event = Event.builder()
        .startDate(startDate)
        .endDate(endDate)
        .location(location)
        .description(description)
        .title(title)
        .user(user)
        .attendeeCount(0)
        .build();

        try {
            eventRepository.save(event);
            return new Response(true, "Event saved successfully!");
        } catch (Exception e) {
            return new Response(false, "Event post failed!");
        }
    }

    /**
     * Gets all the events for a specific user.
     * @param email Email for the user.
     * @return List of all the events associated with that user.
     */
    public List<EventDto> getEventsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }

        return eventRepository.findByUserId(user.getId())
        .stream()
        .map(event -> new EventDto(user.getEmail(), event.getStartDate(), event.getEndDate(), event.getLocation(), event.getDescription(), event.getTitle(), event.getAttendeeCount(), event.getId()))
        .collect(Collectors.toList());
    }

    /**
     * Gets all the events in the database regardless of user.
     * @return List of all the events.
     */
    public List<EventDto> getAllEvents() {
        return eventRepository.findAll()
        .stream()
        .map(event -> new EventDto(event.getUser().getEmail(), event.getStartDate(), event.getEndDate(), event.getLocation(), event.getDescription(), event.getTitle(), event.getAttendeeCount(), event.getId()))
        .collect(Collectors.toList());
    }
}
