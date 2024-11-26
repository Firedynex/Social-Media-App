package org.circl.dbms.backend.service;

import org.circl.dbms.backend.dto.UserDto;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public UserDto getUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        return new UserDto(user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
