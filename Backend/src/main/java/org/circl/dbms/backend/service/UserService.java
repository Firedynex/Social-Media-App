package org.circl.dbms.backend.service;

import java.util.List;
import java.util.stream.Collectors;

import org.circl.dbms.backend.dto.UserDto;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.UserRepository;
import org.circl.dbms.backend.response.Response;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for users.
 */
@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    /**
     * Gets a desired user from the database.
     * @param email Email of the desired user.
     * @return User information.
     */
    public UserDto getUser(String email) {
        User user = userRepository.findByEmail(email).get();
        if (user == null) {
            throw new IllegalArgumentException("Invalid User");
        }
        return new UserDto(user.getEmail(), user.getFirstName(), user.getLastName());
    }

    /**
     * Allows one user to follow another.
     * @param userEmail User that wants to follow.
     * @param followEmail User that is going to be followed.
     * @return Response on whether the follow was successful or not.
     */
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

    /**
     * Allows a user to unfollow another user.
     * @param userEmail User that wants to unfollow.
     * @param followEmail User that is going to be unfollowed.
     * @return Response on whether the unfollow request was done or not.
     */
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

    /**
     * Gets all the followers for a user.
     * @param email Email for the desired user.
     * @return List of the followers for the user.
     */
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

    /**
     * Gets all the users a user is following.
     * @param email Email for the desired user.
     * @return All the users an user is following.
     */
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

    /**
     * Converts user objects into DTOs for data purposes.
     * @param user User to be converted.
     * @return UserDTO created from the User.
     */
    private UserDto convertToUserDto(User user) {
        return new UserDto(user.getEmail(), user.getFirstName(), user.getLastName());
    }
}
