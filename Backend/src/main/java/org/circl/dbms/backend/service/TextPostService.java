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

@Service
@RequiredArgsConstructor
public class TextPostService {

    private final TextPostRepository textPostRepository;
    private final UserRepository userRepository;

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

    public List<TextPostDto> getTextPostsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }
        
        return textPostRepository.findByUserId(user.getId())
        .stream()
        .map(post -> new TextPostDto(user.getEmail(), post.getTextContent(), post.getLikeCounter()))
        .collect(Collectors.toList());
    }

    public List<TextPost> getAllTextPosts() {
        return textPostRepository.findAll();
    }

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
