package com.erasil_production.online_market.services;

import com.erasil_production.online_market.entity.Order;

import java.util.List;

public interface OrderService {

    Order addOrder(Order order);
    List<Order> getALlOrder();
    Order getOrder(Long id);
    void deleteOrder(Order order);
    Order saveOrder(Order order);

}
