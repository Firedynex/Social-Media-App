package social_media_app.backend.backend.service;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Creates a Java bean for a password encoder.
     * @return The created BCryptPasswordEncoder.
     */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Handles various authentication configurations.
     * @param http
     * @return
     * @throws Exception
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors().and().csrf().disable() // Disable CSRF if needed (use cautiously)
            .authorizeRequests()
            .requestMatchers("/users/register", "/users/login", "/TextPost/**").permitAll() // Allow public access
            .anyRequest().authenticated(); // Protect all other endpoints
            // .and()
            // .formLogin().disable(); // Disable default form login if using custom authentication

        return http.build();
    }
}
