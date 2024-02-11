package com.erasil_production.online_market.services.impl;

import com.erasil_production.online_market.entity.Message;
import com.erasil_production.online_market.repository.MessageRepository;
import com.erasil_production.online_market.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Message addMessage(Message message) {
        return messageRepository.save(message);
    }

    @Override
    public List<Message> getALlMessage() {
        return messageRepository.findAll();
    }

    @Override
    public Message getMessage(Long id) {
        return messageRepository.getReferenceById(id);
    }

    @Override
    public void deleteMessage(Message message) {
        messageRepository.delete(message);
    }

    @Override
    public Message saveMessage(Message message) {
        return messageRepository.save(message);
    }
}
