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

@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/{email}")
    public ResponseEntity<UserDto> getUser(@PathVariable String email) {
        return ResponseEntity.ok(userService.getUser(email));
    }

    @GetMapping("/getFollowers/{email}")
    public ResponseEntity<List<UserDto>> getUserFollowers(@PathVariable String email) {
        return ResponseEntity.ok(userService.getFollowers(email));
    }

    @GetMapping("/getFollowing/{email}")
    public ResponseEntity<List<UserDto>> getUserFollowing(@PathVariable String email) {
        return ResponseEntity.ok(userService.getFollowing(email));
    }

    @PostMapping("/{userEmail}/follow/{targetEmail}")
    public ResponseEntity<Response> followUser(@PathVariable String userEmail, @PathVariable String targetEmail) {
        return ResponseEntity.ok(userService.followUser(userEmail, targetEmail));
    }

    @PostMapping("/{userEmail}/unfollow/{targetEmail}")
    public ResponseEntity<Response> unfollowUser(@PathVariable String userEmail, @PathVariable String targetEmail) {
        return ResponseEntity.ok(userService.unfollowUser(userEmail, targetEmail));
    }
}
