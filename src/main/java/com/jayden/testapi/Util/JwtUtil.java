package com.jayden.testapi.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.time.Instant;
import java.time.temporal.ChronoUnit;

@Service
@Component
public class JwtUtil {
    @Value("${jwt_secret}")
    private String secret;

    Instant now = Instant.now();

    public JwtUtil() {
        
    }

    public String sign(Long id, String email, String accountType) {
        return Jwts.builder()
            .setSubject("user")
            .setAudience("users")
            .claim("id",id)
            .claim("email",email)
            .claim("accountType", accountType)
            .setIssuedAt(Date.from(now))
            // set expiration to a week
            .setExpiration(Date.from(now.plus(128, ChronoUnit.HOURS)))
            .signWith(Keys.hmacShaKeyFor(secret.getBytes()))
            .compact();
    }

    public Jws<Claims> extractClaims(String token) {
        try {
            return Jwts.parserBuilder()
                .requireAudience("users")
                .setSigningKey(secret.getBytes())
                .build()
                .parseClaimsJws(token);
        } catch (SignatureException e) {
            throw new InvalidTokenException("Invalid Token - Forbidden");
        }
    }
}
