package social_media_app.backend.backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import social_media_app.backend.backend.model.TextPost;
import social_media_app.backend.backend.repository.TextPostRepository;

@Service
public class TextPostService {
    @Autowired
    private TextPostRepository textPostRepository;

    /**
     * Creates a text post in the data base.
     * @param textPost Text post object supplied by the user.
     * @return The saved text post object in the database.
     */
    public TextPost createTextPost(TextPost textPost) {
        return textPostRepository.save(textPost);
    }

    /**
     * Gets the user's text posts based on their email.
     * @param email Email address for identifying the text post.
     * @return List of text posts made by the user.
     */
    public List<TextPost> getUserTextPosts(String email) {
        return textPostRepository.findByUserEmail(email);
    }
}
