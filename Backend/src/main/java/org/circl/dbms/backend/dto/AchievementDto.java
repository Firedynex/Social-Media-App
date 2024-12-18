package org.circl.dbms.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * DTO object that models data transfer object for achievement.
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AchievementDto {
    private String email;
    private String description;
    private String date;
    private String title;
    private String firstName;
    private String lastName;
}
