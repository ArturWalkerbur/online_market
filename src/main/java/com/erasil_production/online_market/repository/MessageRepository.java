package com.erasil_production.online_market.repository;

import com.erasil_production.online_market.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
