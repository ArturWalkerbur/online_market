package com.erasil_production.online_market.services;

import com.erasil_production.online_market.entity.Message;

import java.util.List;

public interface MessageService {

    Message addMessage(Message message);
    List<Message> getALlMessage();
    Message getMessage(Long id);
    void deleteMessage(Message message);
    Message saveMessage(Message message);
    
}
