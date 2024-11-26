package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.AchievementDto;
import org.circl.dbms.backend.model.Achievement;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.AchievementRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AchievementService {
    
    private final UserRepository userRepository;
    private final AchievementRepository achievementRepository;

    public Achievement saveAchievement(String email, String description, String date) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }

        Achievement achievement = Achievement.builder()
        .user(user)
        .description(description)
        .achievementDate(date)
        .likeCounter(0)
        .build();

        return achievementRepository.save(achievement);
    }

    public List<AchievementDto> getAchievementsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }

        return achievementRepository.findByUserId(user.getId())
        .stream()
        .map(achievement -> new AchievementDto(user.getEmail(), achievement.getDescription(), achievement.getAchievementDate(), achievement.getLikeCounter()))
        .collect(Collectors.toList());
    }
}
