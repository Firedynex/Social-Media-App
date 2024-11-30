package org.circl.dbms.backend.dto;

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
    private String title;
    private int attendeeCount;
}
