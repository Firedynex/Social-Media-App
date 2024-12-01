package org.circl.dbms.backend.model;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.circl.dbms.backend.enums.Role;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

/**
 * User model that models users in the database.
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "user")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    private int id;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false, length = 100)
    private String password;

    @Column(name = "firstName", nullable = false, length = 100)
    private String firstName;

    @Column(name = "lastName", nullable = false, length = 100)
    private String lastName;

    @ManyToMany
    @JoinTable(
        name = "user_followers",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "follower_id")
    )
    private Set<User> followers = new HashSet<>();

    @ManyToMany(mappedBy = "followers")
    private Set<User> following = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private Role role;

    /**
     * Gets the users role.
     */
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    /**
     * Gets the users email.
     * @return String of the user's email.
     */
    @Override
    public String getUsername() {
        return this.email;
    }

    /**
     * Checks if the account is expired or not.
     * @return boolean Whether the account is expired or not.
     */
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * Checks if the account is locked or not.
     * @return boolean Whether the account is locked or not.
     */
    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    /**
     * Checks whether the credentials are expired or not.
     * @return boolean Whether the credentials are expired or not.
     */
    @Override 
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * Checks whether the account is enabled or not.
     * @return boolean Whether the account is enabled or not.
     */
    @Override
    public boolean isEnabled() {
        return true;
    }
}
