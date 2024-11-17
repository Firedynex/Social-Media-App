package social_media_app.backend.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import social_media_app.backend.backend.model.User;
import social_media_app.backend.backend.repository.UserRepository;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * Saves the user into the database. First encrypts the password from registration and then saves user.
     * @param user User object that will be saved into the database.
     * @return The user that is saved in the database.
     */
    public User saveUser(User user) {
        String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
        user.setPassword(encryptedPassword);
        return userRepository.save(user);
    }

    /**
     * Finds a specified user based on the given email.
     * @param email Email id for the requested user.
     * @return The user if found else returns null.
     */
    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    /**
     * Determines if the user is valid by checking if the user exists and the given password matches with what is stored in the database.
     * @param email Email of the desired user.
     * @param rawPass Password provided at login to check with the hashedpassword in the database.
     * @return True if the user exists and the passwords match. False otherwise.
     */
    public boolean validateUser(String email, String rawPass) {
        User existingUser = findByEmail(email);
        return existingUser != null && passwordEncoder.matches(rawPass, existingUser.getPassword());
    }
}
