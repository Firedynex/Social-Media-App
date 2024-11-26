package org.circl.dbms.backend.service;

import java.util.ArrayList;
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

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public Response saveEvent(String email, String startDate, String endDate, String location, String description) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        Event event = Event.builder()
        .startDate(startDate)
        .endDate(endDate)
        .location(location)
        .description(description)
        .user(user)
        .build();

        try {
            eventRepository.save(event);
            return new Response(true, "Event saved successfully!");
        } catch (Exception e) {
            return new Response(false, "Event post failed!");
        }
    }

    public List<EventDto> getEventsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }

        return eventRepository.findByUserId(user.getId())
        .stream()
        .map(event -> new EventDto(user.getEmail(), event.getStartDate(), event.getEndDate(), event.getLocation(), event.getDescription()))
        .collect(Collectors.toList());
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }
}
