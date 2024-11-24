package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.TextPostDto;
import org.circl.dbms.backend.model.TextPost;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.TextPostRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TextPostService {

    private final TextPostRepository textPostRepository;
    private final UserRepository userRepository;

    public TextPost saveTextPost(String email, String content) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        TextPost textPost = TextPost.builder().textContent(content).user(user).build();
        
        return textPostRepository.save(textPost);
    }

    public List<TextPostDto> getTextPostsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }
        
        return textPostRepository.findByUserId(user.getId())
        .stream()
        .map(post -> new TextPostDto(user.getEmail(), post.getTextContent()))
        .collect(Collectors.toList());
    }
}
