package com.erasil_production.online_market.services;

import com.erasil_production.online_market.entity.Roles;
import com.erasil_production.online_market.entity.Users;
import com.erasil_production.online_market.repository.RoleRepository;
import com.erasil_production.online_market.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

public class UsersService implements UserDetailsService {

    @Autowired
    private UsersRepository usersRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private RoleRepository roleRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users users = usersRepository.findByEmail(email);
        if (users == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return users;
    }

    public Users findUser(String email) throws UsernameNotFoundException {
        Users users = usersRepository.findByEmail(email);
        if (users == null) {
            throw new UsernameNotFoundException("User not found");
        }
        return users;
    }

    public String addUser(Users newUser, String rePassword) {
        Users user = usersRepository.findByEmail(newUser.getEmail());
        if (user != null){
            return "register?email-error";
        }
        if (!newUser.getPassword().equals(rePassword)) {
            return "register?password-error";
        }
        newUser.setPassword(passwordEncoder.encode(rePassword));
        Roles userRole = roleRepository.findRoleUser();
        newUser.setRoles(List.of(userRole));
        usersRepository.save(newUser);
        return "Log-in?success";

    }

    public Users getCurrentUser() {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication instanceof AnonymousAuthenticationToken){
            return null;
        }

        return (Users) authentication.getPrincipal();
    }

    public String updatePassword(String password, String newPassword, String reNewPassword) {

        Users user = getCurrentUser();

        if(!passwordEncoder.matches(password, user.getPassword())){
            return "profile?equal-error";
        }
        if(!newPassword.equals(reNewPassword)){
            return "profile?retype-error";
        }
        user.setPassword(passwordEncoder.encode(newPassword));
        usersRepository.save(user);
        return "profile?success";
    }

}