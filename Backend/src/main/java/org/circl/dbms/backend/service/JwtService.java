package org.circl.dbms.backend.service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

/**
 * Service for managing JSON Web Tokens (JWTs), including generation, validation,
 * and claims extraction.
 */
@Service
public class JwtService {
    
    private static final String SECRET_KEY = "7f0daf9e630f0a5d195cf3f994cb4977ff9ac74e0e7cc69695ec490104ec71ab";
    
    /**
     * Extracts the email (subject) from the given JWT token.
     * @param token the JWT token to extract the email from.
     * @return the email of the user associated with the JWT token.
     */
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    /**
     * Extracts a specific claim from the JWT token using the provided claims resolver function.
     * @param <T> the type of the claim to extract.
     * @param token the JWT token.
     * @param claimsResolver a function to extract a specific claim from the claims.
     * @return the extracted claim of type T.
     */
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Generates a JWT token with no extra claims for the specified user.
     * @param userDetails the UserDetails of the user for whom the token is generated.
     * @return a JWT token as a String.
     */
    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    /**
     * Generates a JWT token with the specified claims for the given user.
     * @param extractClaims a map of additional claims to include in the token.
     * @param userDetails   the UserDetails of the user for whom the token is generated.
     * @return a JWT token as a String.
     */
    public String generateToken(Map<String, Object> extractClaims, UserDetails userDetails) {
        return Jwts
        .builder()
        .setClaims(extractClaims)
        .setSubject(userDetails.getUsername())
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 72))
        .signWith(getSignInKey(), SignatureAlgorithm.HS256)
        .compact();
    }

    /**
     * Extracts all claims from a JWT token.
     * @param token the JWT token to extract claims from.
     * @return the claims contained in the token.
     */
    private Claims extractAllClaims(String token) {
        return Jwts
        .parserBuilder()
        .setSigningKey(getSignInKey())
        .build()
        .parseClaimsJws(token)
        .getBody();
    }

    /**
     * Retrieves the signing key used for signing JWT tokens.
     * @return the signing Key.
     */
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    /**
     * Validates a JWT token by checking its username and expiration.
     * @param token the JWT token to validate.
     * @param userDetails the UserDetails to match against the token's subject.
     * @return true if the token is valid, false otherwise.
     */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractEmail(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    /**
     * Checks if a JWT token has expired.
     * @param token the JWT token to check.
     * @return true if the token is expired, false otherwise.
     */
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     * Extracts the expiration date from a JWT token.
     * @param token the JWT token to extract the expiration date from.
     * @return the expiration date of the token.
     */
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
}
