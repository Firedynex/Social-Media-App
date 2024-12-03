package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.TextPostDto;
import org.circl.dbms.backend.model.TextPost;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.TextPostRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.circl.dbms.backend.response.Response;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for text posts.
 */
@Service
@RequiredArgsConstructor
public class TextPostService {

    private final TextPostRepository textPostRepository;
    private final UserRepository userRepository;

    /**
     * Creates and saves text posts to the database.
     * @param email Email of the user to save the text post for.
     * @param content Content of the text post.
     * @return Response on the success status of the save.
     */
    public Response saveTextPost(String email, String content) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        TextPost textPost = TextPost.builder()
                                    .textContent(content)
                                    .user(user)
                                    .likeCounter(0)
                                    .build();
        
        try {
            textPostRepository.save(textPost);
            return new Response(true, "Text Post saved!");
        } catch (Exception e) {
            return new Response(false, "Text post save unsuccessful!");
        }
    }

    /**
     * Gets all the text posts for a specific user.
     * @param email Email of the desired user.
     * @return List of all the text posts associated with that user.
     */
    public List<TextPostDto> getTextPostsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }
        
        return textPostRepository.findByUserId(user.getId())
        .stream()
        .map(post -> new TextPostDto(post.getId(), user.getEmail(), post.getTextContent(), post.getLikeCounter(), user.getFirstName(), user.getLastName()))
        .collect(Collectors.toList());
    }

    /**
     * Gets all the text posts in the database regardless of user.
     * @return List of all text posts in the database.
     */
    public List<TextPostDto> getAllTextPosts() {
        return textPostRepository.findAll()
        .stream()
        .map(textPost -> new TextPostDto(textPost.getId(), textPost.getUser().getEmail(), textPost.getTextContent(), textPost.getLikeCounter(), textPost.getUser().getFirstName(), textPost.getUser().getLastName()))
        .collect(Collectors.toList());
    }

    /**
     * Likes a post and updates the like counter for a post in the database.
     * @param postId Id of the post to be liked.
     * @return Response on whether liking the post was successful or not.
     */
    public Response likePost(Long postId) {
        TextPost textPost = textPostRepository.findById(postId).orElse(null);
        if (textPost == null) {
            throw new IllegalArgumentException("Invalid post id");
        }
        textPost.setLikeCounter(textPost.getLikeCounter()+1);
        try {
            textPostRepository.save(textPost);
            return new Response(true, "Post liked successfully!");
        } catch (Exception e) {
            return new Response(false, "Failed to like post!");
        }
    }
}
