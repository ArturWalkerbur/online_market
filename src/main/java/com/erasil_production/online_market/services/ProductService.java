package com.erasil_production.online_market.services;


import com.erasil_production.online_market.entity.Category;
import com.erasil_production.online_market.entity.Product;

import java.util.List;

public interface ProductService {

    Product addProduct(Product product);
    List<Product> getALlProduct();
    List<Product> getProductsByCategory(Category category);
    Product getProduct(Long id);
    void deleteProduct(Product product);
    Product saveProduct(Product product);
    
}
