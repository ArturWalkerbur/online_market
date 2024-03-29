package com.erasil_production.online_market.controllers;


import com.erasil_production.online_market.dto.*;
import com.erasil_production.online_market.entity.*;
import com.erasil_production.online_market.services.*;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.text.SimpleDateFormat;
import java.util.List;


@Controller
@RestController
@PreAuthorize("isAnonymous()")
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

    @Autowired
    UsersService usersService;

    @Autowired
    AuthService authService;

    @Value("${file.img.viewPath}")
    private String viewPath;

    @Value("${file.img.defaultPicture}")
    private String defaultPicture;

    @PostMapping("/login")
    public ResponseEntity<JWTAuthResponse> authenticate(@RequestBody UserDTO loginDto){
        String token = authService.login(loginDto);

        JWTAuthResponse jwtAuthResponse = new JWTAuthResponse();
        jwtAuthResponse.setAccessToken(token);

        System.out.println(token);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    @PreAuthorize("isAnonymous()")
    @PostMapping("/register")
    @ResponseBody
    public ResponseEntity<String> Register(@RequestBody RegisterDTO register_dto){
        System.out.println(register_dto.getEmail());
        System.out.println(register_dto.getUsername());
        String result = usersService.addUser(new Users(null, register_dto.getEmail(), register_dto.getPassword(), register_dto.getUsername()), register_dto.getRePassword());
        return ResponseEntity.ok("New user registered!");
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/getAllCategory")
    @ResponseBody
    public ResponseEntity<List<Category>> getAllCategory(){
        List<Category> categories = categoryService.getALlCategory();
        return ResponseEntity.ok(categories);
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/getAllProducts")
    @ResponseBody
    public ResponseEntity<List<Product>> getAllProducts(){
        List<Product> products = productService.getALlProduct();
        return ResponseEntity.ok(products);
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/getProductsByCategory/{name}")
    @ResponseBody
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable(name = "name")String name){
        Category category = categoryService.getCategoryByName(name);
        List<Product> products = productService.getProductsByCategory(category);
        return ResponseEntity.ok(products);
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/getCategory/{id}")
    @ResponseBody
    public ResponseEntity<CategoryDTO> getCategory(@PathVariable(name = "id") Long id) {
        Category category = categoryService.getCategory(id);
        CategoryDTO categoryDTO = new CategoryDTO(category.getId(), category.getName(), category.getImg());
        return ResponseEntity.ok(categoryDTO);
    }

    @PreAuthorize("isAnonymous()")
    @GetMapping("/getProduct/{id}")
    @ResponseBody
    public ResponseEntity<ProductDTO> getProduct(@PathVariable(name = "id")Long id){
        Product product = productService.getProduct(id);
        ProductDTO productDTO = new ProductDTO(product.getId(), product.getName(), product.getDescription(), product.getPrice(), product.getImg(), product.isAvailability(), product.getCategory().getId());
        return ResponseEntity.ok(productDTO);
    }

    @PreAuthorize("isAnonymous()")
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

    @PreAuthorize("isAnonymous()")
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

    @PreAuthorize("isAnonymous()")
    @GetMapping(value = "/viewImg/{url}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    public @ResponseBody byte[] viewImg(@PathVariable(name = "url")String url) throws IOException {
        String imgURL = viewPath+defaultPicture;

        if(url!=null){
            imgURL = viewPath+url+".jpg";
        }
        InputStream in;

        try{

            File imgFile = new File(imgURL);
            in = new FileInputStream(imgFile);

        }catch (Exception e){
            File imgFile = new File(viewPath+defaultPicture);
            in = new FileInputStream(imgFile);

            e.printStackTrace();
        }

        return IOUtils.toByteArray(in);

    }

    @PreAuthorize("isAnonymous()")
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
