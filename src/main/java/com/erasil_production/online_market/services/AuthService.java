package com.erasil_production.online_market.services;

import com.erasil_production.online_market.dto.UserDTO;

public interface AuthService {
    String login(UserDTO loginDto);
}
