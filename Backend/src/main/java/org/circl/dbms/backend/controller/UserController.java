package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.UserDto;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * Controller class that handles all of the REST endpoints for Users.
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    /**
     * Gets the specified user from the database using their email.
     * @param email Email for the specified user to search with.
     * @return Response entity with the user information.
     */
    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUser(email));
    }

    /**
     * Gets all the followers for a specific user.
     * @param email Email for the desired user.
     * @return Response entity with all of the followers for a specific user.
     */
    @GetMapping("/getFollowers/{email}")
    public ResponseEntity<List<UserDto>> getUserFollowers(@PathVariable String email) {
        return ResponseEntity.ok(userService.getFollowers(email));
    }

    /**
     * Gets all the users a user is following.
     * @param email Email for the desired user to search for.
     * @return Response entity with all of the users the user is following.
     */
    @GetMapping("/getFollowing/{email}")
    public ResponseEntity<List<UserDto>> getUserFollowing(@PathVariable String email) {
        return ResponseEntity.ok(userService.getFollowing(email));
    }

    /**
     * Method that allows a user to follow another user.
     * @param userEmail User that wants to follow.
     * @param targetEmail Target user that is going to be followed.
     * @return Response entity with a response on whether the follow request was successful or not.
     */
    @PostMapping("/{userEmail}/follow/{targetEmail}")
    public ResponseEntity<Response> followUser(@PathVariable String userEmail, @PathVariable String targetEmail) {
        return ResponseEntity.ok(userService.followUser(userEmail, targetEmail));
    }

    /**
     * Method that allows the user to unfollow another user.
     * @param userEmail User that wants to unfollow.
     * @param targetEmail User that is going to be unfollowed.
     * @return Response entity with a response on whether the unfollow request was sucessful or not.
     */
    @PostMapping("/{userEmail}/unfollow/{targetEmail}")
    public ResponseEntity<Response> unfollowUser(@PathVariable String userEmail, @PathVariable String targetEmail) {
        return ResponseEntity.ok(userService.unfollowUser(userEmail, targetEmail));
    }
}
