package social_media_app.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import social_media_app.backend.backend.model.Achievements;
import social_media_app.backend.backend.repository.AchievementsRepository;


@RestController
public class AchievementsController {
    
    @Autowired
    private AchievementsRepository achievementsRepository;

    @PostMapping("/achievements")
    Achievements newAchievement(@RequestBody Achievements newAchievement) {
        return achievementsRepository.save(newAchievement);
    }

    @GetMapping("/achievements")
    List<Achievements> getAllAchievements() {
        return achievementsRepository.findAll();
    }
}
