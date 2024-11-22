package org.circl.dbms.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.circl.dbms.backend.model.TextPost;

public interface TextPostRepository extends JpaRepository<TextPost, Long> {
    List<TextPost> findByUserId(Integer userId);
}
