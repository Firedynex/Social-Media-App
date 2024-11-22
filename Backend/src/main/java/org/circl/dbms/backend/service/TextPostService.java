package org.circl.dbms.backend.service;

import java.util.List;
import java.util.Optional;

import org.circl.dbms.backend.model.TextPost;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.TextPostRepository;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.websocket.Decoder.Text;
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

    public List<TextPost> getTextPostsByUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user");
        }
        
        return textPostRepository.findByUserId(user.getId());
    }
}
