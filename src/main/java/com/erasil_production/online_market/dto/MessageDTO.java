package com.erasil_production.online_market.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MessageDTO {

    private Long id;
    private String topic;
    private String text;
    private String date;

}
