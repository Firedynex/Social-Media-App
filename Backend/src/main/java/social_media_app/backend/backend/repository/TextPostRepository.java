package social_media_app.backend.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import social_media_app.backend.backend.model.TextPost;

public interface TextPostRepository extends JpaRepository<TextPost, Long>{
    List<TextPost> findByUserEmail(String email);
}
