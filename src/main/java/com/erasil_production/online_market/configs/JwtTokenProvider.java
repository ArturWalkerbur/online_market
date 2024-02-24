package com.erasil_production.online_market.configs;

import com.erasil_production.online_market.entity.Roles;
import com.erasil_production.online_market.entity.Users;
import com.erasil_production.online_market.services.UsersService;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(JwtTokenProvider.class);

    private UsersService usersService;

    public JwtTokenProvider(UsersService userDetailsService) {
        this.usersService = userDetailsService;
    }

    @Value("${app.jwt-secret}")
    private String jwtSecret;

    @Value("${app-jwt-expiration-milliseconds}")
    private long jwtExpirationDate;

    public String generateToken(Authentication authentication){


        String username = authentication.getName();

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + jwtExpirationDate);

        Users user = usersService.findUser(username);

        List<Roles> roles = user.getRoles();

        boolean isAdmin = roles.stream()
                .anyMatch(role -> "ADMIN".equals(role.getAuthority()));

        String role = "USER";

        if (isAdmin) {
            role = "ADMIN";
        }

        String token = Jwts.builder()
                .claim("role", role)
                .claim("username", user.getUserName())
                .subject(username)
                .issuedAt(new Date())
                .expiration(expireDate)
                .signWith(key())
                .compact();

        return token;
    }

    private Key key(){

        return Keys.hmacShaKeyFor(
                Decoders.BASE64.decode(jwtSecret)
        );
    }

    public String getUsername(String token){
        Claims claims = Jwts.parser().verifyWith((SecretKey) key()).build().parseSignedClaims(token).getPayload();
        String username = claims.getSubject();
        return username;
    }

    public boolean validateToken(String token){
        try{
            System.out.println(token + "validate");
            Jwts.parser().verifyWith((SecretKey) key())
                    .build()
                    .parse(token);
            return true;
        } catch (MalformedJwtException e) {
            logger.error("Invalid JWT token: {}", e.getMessage());
        } catch (ExpiredJwtException e) {
            logger.error("JWT token is expired: {}", e.getMessage());
        } catch (UnsupportedJwtException e) {
            logger.error("JWT token is unsupported: {}", e.getMessage());
        } catch (IllegalArgumentException e) {
            logger.error("JWT claims string is empty: {}", e.getMessage());
        }
        return false;
    }


}