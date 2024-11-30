package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.UserDto;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.UserRepository;
import org.circl.dbms.backend.response.Response;
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

    public Response followUser(String userEmail, String followEmail) {
        User user = userRepository.findByEmail(userEmail).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user email");
        }
        User followUser = userRepository.findByEmail(followEmail).get();
        if (followUser == null) {
            throw new IllegalArgumentException("Invalid recepient email!");
        }

        followUser.getFollowers().add(user);
        user.getFollowing().add(followUser);
        userRepository.save(user);
        userRepository.save(followUser);

        return new Response(true, "Successfully followed!");
    }

    public Response unfollowUser(String userEmail, String followEmail) {
        User user = userRepository.findByEmail(userEmail).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid user email");
        }
        User followUser = userRepository.findByEmail(followEmail).get();
        if (followUser == null) {
            throw new IllegalArgumentException("Invalid recepient email!");
        }

        followUser.getFollowers().remove(user);
        user.getFollowing().remove(followUser);

        userRepository.save(user);
        userRepository.save(followUser);

        return new Response(true, "Successfully unfollowed!");
    }

    public List<UserDto> getFollowers(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid email!");
        }

        return user.getFollowers()
        .stream()
        .map(this::convertToUserDto)
        .collect(Collectors.toList());
    }

    public List<UserDto> getFollowing(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid email!");
        }

        return user.getFollowing()
        .stream()
        .map(this::convertToUserDto)
        .collect(Collectors.toList());
    }

    private UserDto convertToUserDto(User user) {
        return new UserDto(user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
