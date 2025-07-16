package com.AdaptMart.Util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String SecretKey;

    @Value("${jwt.expiration}")
    private Long Expiration;


    public String generateToken(UserDetails userDetails, String role) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("role", role) // ✅ Add role claim
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + Expiration))
                .signWith(Keys.hmacShaKeyFor(SecretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractUsername(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SecretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String userName = extractUsername(token);
        return userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(SecretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }


    public String extractRole(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SecretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .get("role", String.class);
    }

    public byte[] getSecretKeyBytes() {
        return SecretKey.getBytes();
    }

}
