package com.erasil_production.online_market.services.impl;

import com.erasil_production.online_market.configs.JwtTokenProvider;
import com.erasil_production.online_market.dto.UserDTO;
import com.erasil_production.online_market.repository.UsersRepository;
import com.erasil_production.online_market.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    UsersRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    JwtTokenProvider jwtTokenProvider;


    @Override
    public String login(UserDTO loginDto) {

        System.out.println(loginDto.getEmail());
        System.out.println(loginDto.getPassword());

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                loginDto.getEmail(), loginDto.getPassword()));


        SecurityContextHolder.getContext().setAuthentication(authentication);

        System.out.println(authentication.isAuthenticated());

        String token = jwtTokenProvider.generateToken(authentication);

        return token;
    }
}
