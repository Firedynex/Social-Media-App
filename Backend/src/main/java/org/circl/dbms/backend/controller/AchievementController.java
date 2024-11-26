package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.AchievementDto;
import org.circl.dbms.backend.dto.TextPostDto;
import org.circl.dbms.backend.model.Achievement;
import org.circl.dbms.backend.service.AchievementService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/achievement")
public class AchievementController {
    private final AchievementService achievementService;

    @GetMapping("/{email}")
    public ResponseEntity<List<AchievementDto>> getAchievementsByUser(@PathVariable String email) {
        List<AchievementDto> achievements = achievementService.getAchievementsByUser(email);
        return ResponseEntity.ok(achievements);
    }

    @PostMapping
    public ResponseEntity<Achievement> createAchievement(@RequestBody AchievementDto achievementDto) {
        return ResponseEntity.ok(achievementService.saveAchievement(achievementDto.getEmail(), achievementDto.getDescription(), achievementDto.getDate()));
    }
}
