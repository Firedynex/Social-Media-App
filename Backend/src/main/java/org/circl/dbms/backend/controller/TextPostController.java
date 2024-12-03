package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.TextPostDto;
import org.circl.dbms.backend.model.TextPost;
import org.circl.dbms.backend.response.Response;
import org.circl.dbms.backend.service.TextPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

/**
 * Controller class that handles REST endpoints for the text post functionality for the app.
 */
@RequiredArgsConstructor
@RestController
@RequestMapping("/textPost")
public class TextPostController {
    private final TextPostService textPostService;

    /**
     * Gets all the text posts for a specific user.
     * @param email Email for the specific user to search for.
     * @return Response entity with all of the text posts for the specified user.
     */
    @GetMapping("/user/{email}")
    public ResponseEntity<List<TextPostDto>> getPostsByUser(@PathVariable String email) {
        List<TextPostDto> textPosts = textPostService.getTextPostsByUser(email);
        return ResponseEntity.ok(textPosts);
    }

    /**
     * Creates a text post in the database for a user.
     * @param textPostDto Request body for the text post to be created.
     * @return Response entity with a response on whether the text post was successfully saved in the database or not.
     */
    @PostMapping
    public ResponseEntity<Response> createTextPost(@RequestBody TextPostDto textPostDto) {
        return ResponseEntity.ok(textPostService.saveTextPost(textPostDto.getEmail(), textPostDto.getContent()));
    }

    /**
     * Gets all the text posts from the database regardless of the user.
     * @return Response entity with all the text posts.
     */
    @GetMapping("/getall")
    public ResponseEntity<List<TextPostDto>> getAllTextPosts() {
        return ResponseEntity.ok(textPostService.getAllTextPosts());
    }

    /**
     * Adds a like to the specified text post.
     * @param postid Id for the post to like.
     * @return A response entity with a response whether the like was registered or not.
     */
    @PostMapping("/like/{postid}")
    public ResponseEntity<Response> likeTextPost(@PathVariable Long postid) {
        return ResponseEntity.ok(textPostService.likePost(postid));
    }
}
