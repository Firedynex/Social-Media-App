package org.circl.dbms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AttendeeDto {
    private String firstName;
    private String lastName;
    private int guestCount;
    private int eventId;
}