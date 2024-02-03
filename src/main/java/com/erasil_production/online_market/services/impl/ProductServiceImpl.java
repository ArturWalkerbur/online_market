package com.erasil_production.online_market.services.impl;

import com.erasil_production.online_market.entity.Category;
import com.erasil_production.online_market.entity.Product;
import com.erasil_production.online_market.repository.CategoryRepository;
import com.erasil_production.online_market.repository.ProductRepository;
import com.erasil_production.online_market.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    @Override
    public List<Product> getALlProduct() {
        return productRepository.findAll();
    }

    @Override
    public List<Product> getProductsByCategory(Category category) {
        return productRepository.findAllByCategory(category);
    }

    @Override
    public Product getProduct(Long id) {
        return productRepository.getReferenceById(id);
    }

    @Override
    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    @Override
    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }
}
