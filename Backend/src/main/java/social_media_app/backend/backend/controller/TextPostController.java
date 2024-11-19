package social_media_app.backend.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import social_media_app.backend.backend.model.TextPost;
import social_media_app.backend.backend.model.User;
import social_media_app.backend.backend.repository.TextPostRepository;
import social_media_app.backend.backend.repository.UserRepository;

@RestController
@RequestMapping("/TextPost")

public class TextPostController {
    @Autowired
    private TextPostRepository textPostRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    public TextPostController(TextPostRepository textPostRepository, UserRepository userRepository) {
        this.textPostRepository = textPostRepository;
        this.userRepository = userRepository;
    }

    @PostMapping("/user/{email}")
    public TextPost createPost(@PathVariable String email, @RequestBody TextPost post) {
        // Find the user by email
        User user = userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Set the user for the post and save
        post.setUser(user);
        return textPostRepository.save(post);
    }

    @GetMapping("/user/{email}")
    public List<TextPost> getPostsByUser(@PathVariable String email) {
        // Fetch posts by the user's email
        return textPostRepository.findByUserEmail(email);
    }
}
