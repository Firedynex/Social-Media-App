package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.AchievementDto;
import org.circl.dbms.backend.model.Achievement;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.AchievementRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.circl.dbms.backend.response.Response;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for achievements.
 */
@Service
@RequiredArgsConstructor
public class AchievementService {
    
    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;

    /**
     * Creates and saves the achievement in the database.
     * @param email Email for the author (user) of the achievement.
     * @param description Description of the achievement.
     * @param date Date of the achievement.
     * @param title Title of the achievement.
     * @return Response on whether the achievement was successfully saved in the database or not.
     */
    public Response saveAchievement(String email, String description, String date, String title) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }

        Achievement achievement = Achievement.builder()
        .user(user)
        .description(description)
        .achievementDate(date)
        .likeCounter(0)
        .title(title)
        .build();

        try {
            achievementRepository.save(achievement);
            return new Response(true, "Achievement Posted Successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return new Response(true, "Achievement post failed");
        }
    }

    /**
     * Gets the achievements for a specific user.
     * @param email Email for the desired user.
     * @return List of all the achievements for the user.
     */
    public List<AchievementDto> getAchievementsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }

        return achievementRepository.findByUserId(user.getId())
        .stream()
        .map(achievement -> new AchievementDto(user.getEmail(), achievement.getDescription(), achievement.getAchievementDate(), achievement.getLikeCounter(), achievement.getTitle()))
        .collect(Collectors.toList());
    }

    /**
     * Gets all the achievements in the database regardless of user.
     * @return List of all achievements in the database.
     */
    public List<AchievementDto> getAllAchievements() {
        return achievementRepository.findAll()
        .stream()
        .map(achievement -> new AchievementDto(achievement.getUser().getEmail(), achievement.getDescription(), achievement.getAchievementDate(), achievement.getLikeCounter(), achievement.getTitle()))
        .collect(Collectors.toList());
    }
}
