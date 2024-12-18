package org.circl.dbms.backend.repository;

import java.util.Optional;

import org.circl.dbms.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
