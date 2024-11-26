package org.circl.dbms.backend.dto;

import java.util.List;

import org.circl.dbms.backend.model.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class EventDto {
    private String email;
    private String startDate;
    private String endDate;
    private String location;
    private String description;
    // private int attendeeCapacity;
    // private List<User> attendees;
    // private int attendeeCount;
}
