package org.circl.dbms.backend.controller;

import java.util.List;

import org.circl.dbms.backend.dto.TextPostDto;
import org.circl.dbms.backend.model.TextPost;
import org.circl.dbms.backend.service.TextPostService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/textPost")
public class TextPostController {
    private final TextPostService textPostService;

    @GetMapping("/user/{email}")
    public ResponseEntity<List<TextPost>> getPostsByUser(@PathVariable String email) {
        List<TextPost> textPosts = textPostService.getTextPostsByUser(email);
        return ResponseEntity.ok(textPosts);
    }

    @PostMapping
    public ResponseEntity<TextPost> createTextPost(@RequestBody TextPostDto textPostDto) {
        return ResponseEntity.ok(textPostService.saveTextPost(textPostDto.getEmail(), textPostDto.getContent()));
    }
}
