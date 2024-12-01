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
    private int likeCounter;
    private String title;
}
