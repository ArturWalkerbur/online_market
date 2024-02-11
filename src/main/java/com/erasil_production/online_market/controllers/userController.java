package com.erasil_production.online_market.controllers;


import com.erasil_production.online_market.dto.CategoryDTO;
import com.erasil_production.online_market.dto.MessageDTO;
import com.erasil_production.online_market.dto.OrderDTO;
import com.erasil_production.online_market.dto.ProductDTO;
import com.erasil_production.online_market.entity.Category;
import com.erasil_production.online_market.entity.Message;
import com.erasil_production.online_market.entity.Order;
import com.erasil_production.online_market.entity.Product;
import com.erasil_production.online_market.services.CategoryService;
import com.erasil_production.online_market.services.MessageService;
import com.erasil_production.online_market.services.OrderService;
import com.erasil_production.online_market.services.ProductService;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.List;


@Controller
@RestController
@RequestMapping("/api/guest")
@CrossOrigin(origins = "http://localhost:3000")
public class userController {


    @Autowired
    private CategoryService categoryService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderService orderService;

    @Autowired
    private MessageService messageService;

    @Value("${file.img.viewPath}")
    private String viewPath;

    @Value("${file.img.uploadPath}")
    private String uploadPath;

    @Value("${file.img.defaultPicture}")
    private String defaultPicture;


    @GetMapping("/getAllCategory")
    @ResponseBody
    public ResponseEntity<List<Category>> getAllCategory(){
        List<Category> categories = categoryService.getALlCategory();
        return ResponseEntity.ok(categories);
    }

    @GetMapping("/getAllProducts")
    @ResponseBody
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getALlProduct();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/getProductsByCategory/{name}")
    @ResponseBody
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable(name = "name")String name){
        System.out.println(name);
        Category category = categoryService.getCategoryByName(name);
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }


    @GetMapping("/getCategory/{id}")
    @ResponseBody
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable(name = "id") Long id) {
        Category category = categoryService.getCategory(id);
        CategoryDTO categoryDTO = new CategoryDTO(category.getId(), category.getName(), category.getImg());
        return ResponseEntity.ok(categoryDTO);
    }

    @GetMapping("/getProduct/{id}")
    @ResponseBody
    public ResponseEntity<ProductDTO> getProduct(@PathVariable(name = "id")Long id){
        Product product = productService.getProduct(id);
        ProductDTO productDTO = new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImg(), product.isAvailability(), product.getCategory().getId());
        return ResponseEntity.ok(productDTO);
    }


    @PostMapping("/addNewOrder")
    @ResponseBody
    public ResponseEntity<String> addNewOrder(@RequestBody OrderDTO newOrder){
        try{

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date utilDate = dateFormat.parse(newOrder.getDate());

            orderService.addOrder(new Order(null, newOrder.getName(), newOrder.getNumber(), newOrder.getAddress(), newOrder.getAmount(), new java.sql.Date(utilDate.getTime()), productService.getProduct(newOrder.getProduct_id())));

        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("New category added!");
    }

    @PostMapping("/addNewMessage")
    @ResponseBody
    public ResponseEntity<String> addNewMessage(@RequestBody MessageDTO newMessage){
        try{

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date utilDate = dateFormat.parse(newMessage.getDate());

            messageService.addMessage(new Message(null, newMessage.getTopic(), newMessage.getText(), new java.sql.Date(utilDate.getTime())));

        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("New message added!");
    }

    @GetMapping(value = "/viewImg/{url}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public @ResponseBody byte[] viewImg(@PathVariable(name = "url")String url) throws IOException {
        String imgURL = viewPath+defaultPicture;

        if(url!=null){
            imgURL = viewPath+url+".jpg";
        }
        InputStream in;

        try{

            System.out.println(url);

            ClassPathResource resource = new ClassPathResource(imgURL);
            in = resource.getInputStream();

        }catch (Exception e){
            ClassPathResource resource = new ClassPathResource(viewPath+defaultPicture);
            in = resource.getInputStream();

            e.printStackTrace();
        }

        return IOUtils.toByteArray(in);

    }

    @GetMapping(value = "/viewImg/", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public @ResponseBody byte[] viewDefault() throws IOException {
        String imgURL = viewPath+defaultPicture;
        InputStream in;

        try{

            ClassPathResource resource = new ClassPathResource(imgURL);
            in = resource.getInputStream();

        }catch (Exception e){
            ClassPathResource resource = new ClassPathResource(viewPath+defaultPicture);
            in = resource.getInputStream();

            e.printStackTrace();
        }

        return IOUtils.toByteArray(in);

    }




}
