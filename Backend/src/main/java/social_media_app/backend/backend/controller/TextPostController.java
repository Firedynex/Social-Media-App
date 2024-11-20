package social_media_app.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import social_media_app.backend.backend.model.TextPost;
import social_media_app.backend.backend.service.TextPostService;

@RestController
@RequestMapping("/TextPost")

public class TextPostController {
    @Autowired
    private TextPostService textPostService;

    /**
     * Handles creating a post.
     * @param post Post object containing content and user association.
     * @return Created post details.
     */
    @PostMapping
    public ResponseEntity<?> createTextPost(@RequestBody TextPost textPost) {
        return ResponseEntity.ok(textPostService.createTextPost(textPost));
    }

    /**
     * Retrieves all posts for a specific user by email.
     * @param email User's email.
     * @return List of posts associated with the user.
     */
    @GetMapping("/{email}")
    public ResponseEntity<List<TextPost>> getUserTextPosts(@PathVariable String email) {
        return ResponseEntity.ok(textPostService.getUserTextPosts(email));
    }
}
