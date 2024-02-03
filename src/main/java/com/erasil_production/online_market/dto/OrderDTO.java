package com.erasil_production.online_market.dto;

import com.erasil_production.online_market.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDTO {

    private Long id;
    private String name;
    private String number;
    private String address;
    private int amount;
    private String date;
    private Long product_id;


}
