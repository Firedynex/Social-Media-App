package org.circl.dbms.backend.service;

import org.circl.dbms.backend.controller.AuthenticationRequest;
import org.circl.dbms.backend.controller.AuthenticationResponse;
import org.circl.dbms.backend.controller.RegisterRequest;
import org.circl.dbms.backend.enums.Role;
import org.circl.dbms.backend.model.User;
import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

/**
 * Service class for authentication.
 */
@Service
@RequiredArgsConstructor
public class AuthenticationService {
    
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    
    /**
     * Registers the user into the database.
     * @param request Request sent from the user to register.
     * @return AuthenticationResponse stating the JWT token string for the session.
     */
    public AuthenticationResponse register(RegisterRequest request) {
        var user = User.builder()
        .firstName(request.getFirstName())
        .lastName(request.getLastName())
        .email(request.getEmail())
        .password(passwordEncoder.encode(request.getPassword()))
        .role(Role.USER)
        .build();
        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
    }

    /**
     * Logs the user into the system.
     * @param request Authentication Request that the user supplies indicating they want to login.
     * @return An Authentication Response with a JWT token for the session.
     */
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail())
        .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
        .token(jwtToken)
        .build();
    }
    
}
