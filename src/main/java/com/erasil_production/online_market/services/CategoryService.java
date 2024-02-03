package com.erasil_production.online_market.services;

import com.erasil_production.online_market.entity.Category;

import java.util.List;

public interface CategoryService {

    Category addCategory(Category category);
    List<Category> getALlCategory();
    Category getCategoryByName(String name);
    Category getCategory(Long id);
    void deleteCategory(Category category);
    Category saveCategory(Category category);

}
