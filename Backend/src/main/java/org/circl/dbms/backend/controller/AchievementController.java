package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.AchievementDto;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * Controller that defines and handles REST endpoints for the achievement functions for this app.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/achievement")
public class AchievementController {
    private final AchievementService achievementService;

    /**
     * Gets all the achievements for a specific user.
     * @param email Email for the desired user to search for.
     * @return A response entity with all of the user's achievements.
     */
    @GetMapping("/{email}")
    public ResponseEntity<List<AchievementDto>> getAchievementsByUser(@PathVariable String email) {
        List<AchievementDto> achievements = achievementService.getAchievementsByUser(email);
        return ResponseEntity.ok(achievements);
    }

    /**
     * Creates an achievement for a specific user.
     * @param achievementDto Body of the request.
     * @return Response Entity that states whether the achievement was successfully created or not.
     */
    @PostMapping
    public ResponseEntity<Response> createAchievement(@RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.saveAchievement(achievementDto.getEmail(), achievementDto.getDescription(), achievementDto.getDate(), achievementDto.getTitle()));
    }

    /**
     * Gets all the achievements from the database regardless of user.
     * @return A response entity with all of the achievements in the database.
     */
    @GetMapping("/getall")
    public ResponseEntity<List<AchievementDto>> getAllAchievements() {
        return ResponseEntity.ok(achievementService.getAllAchievements());
    }
}
