package com.erasil_production.online_market.services.impl;

import com.erasil_production.online_market.entity.Order;
import com.erasil_production.online_market.repository.OrderRepository;
import com.erasil_production.online_market.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Override
    public Order addOrder(Order order) {
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getALlOrder() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrder(Long id) {
        return orderRepository.getReferenceById(id);
    }

    @Override
    public void deleteOrder(Order order) {
        orderRepository.delete(order);
    }

    @Override
    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }
}

