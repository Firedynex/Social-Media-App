package org.circl.dbms.backend.service;

import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public User getUser(String email) {
        return userRepository.findByEmail(email).get();
    }
}
