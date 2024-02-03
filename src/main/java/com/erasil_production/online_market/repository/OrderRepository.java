package com.erasil_production.online_market.repository;

import com.erasil_production.online_market.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;



@Repository
@Transactional
public interface OrderRepository extends JpaRepository<Order, Long> {



}