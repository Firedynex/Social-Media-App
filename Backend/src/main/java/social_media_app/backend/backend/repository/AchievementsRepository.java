package social_media_app.backend.backend.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import social_media_app.backend.backend.model.Achievements;

@Repository
public interface AchievementsRepository extends JpaRepository<Achievements, Long> {
    
}
