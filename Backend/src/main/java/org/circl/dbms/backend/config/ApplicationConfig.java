package org.circl.dbms.backend.config;

import org.circl.dbms.backend.repository.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;

/**
 * Configuration class for authentication and security beans.
 */

@Configuration
@RequiredArgsConstructor
public class ApplicationConfig {
    
    private final UserRepository repository;

    /**
     * Finds a user from the database given a username. Searches for a user using their email (username).
     * If the user isn't found, returns an error message.
     * Used by the authentication process to validate users during login.
     * @return A specified user.
     * @throws UsernameNotFoundException if the user is not found in the repository.
     */
    @Bean
    public UserDetailsService userDetailsService() {
        return username -> repository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("User not found!"));
    }

    /**
     * Makes an authentication provider to handle authentication logic.
     * Loads user information and checks passwords for validation.
     * @return a DaoAuthenticationProvider configured with a UserDetailsService and PasswordEncoder.
     */
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return authenticationProvider;
    }

    /**
     * Creates a Bcrypt password encoder bean for the the Spring IO container to use to hash passwords.
     * @return BCryptPasswordEncoder for password hashing.
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Exposes an Authentication Manager bean for Spring to handle authentication requests.
     *  @param config the AuthenticationConfiguration used to retrieve the AuthenticationManager.
     * @return an AuthenticationManager instance from the provided configuration.
     * @throws Exception if there is an issue retrieving the AuthenticationManager.
     */
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
