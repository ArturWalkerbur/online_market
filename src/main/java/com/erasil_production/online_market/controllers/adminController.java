package com.erasil_production.online_market.controllers;

import com.erasil_production.online_market.dto.*;
import com.erasil_production.online_market.entity.Category;
import com.erasil_production.online_market.entity.Message;
import com.erasil_production.online_market.entity.Order;
import com.erasil_production.online_market.entity.Product;
import com.erasil_production.online_market.services.CategoryService;
import com.erasil_production.online_market.services.MessageService;
import com.erasil_production.online_market.services.OrderService;
import com.erasil_production.online_market.services.ProductService;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;


import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Controller
@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class adminController {

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


    @GetMapping("/getAllOrders")
    @ResponseBody
    public ResponseEntity<List<Order>> getAllOrders(){
        List<Order> orders = orderService.getALlOrder();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/getALLMessages")
    @ResponseBody
    public ResponseEntity<List<Message>> getAllMessages(){
        List<Message> messages = messageService.getALlMessage();
        return ResponseEntity.ok(messages);
    }

    @GetMapping("/getOrder/{id}")
    @ResponseBody
    public ResponseEntity<OrderDTO> getOrder(@PathVariable(name = "id")Long id){
        Order order = orderService.getOrder(id);
        Date javaDate = new Date(order.getDate().getTime());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        OrderDTO orderDTO = new OrderDTO(order.getId(), order.getName(), order.getNumber(), order.getAddress(), order.getAmount(), dateFormat.format(javaDate), order.getProduct().getId());
        return ResponseEntity.ok(orderDTO);
    }

    @GetMapping("/getMessage/{id}")
    @ResponseBody
    public ResponseEntity<MessageDTO> getMessage(@PathVariable(name = "id")Long id){
        Message message = messageService.getMessage(id);
        Date javaDate = new Date(message.getDate().getTime());
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        MessageDTO messageDTO = new MessageDTO(message.getId(), message.getTopic(), message.getText(), dateFormat.format(javaDate));
        return ResponseEntity.ok(messageDTO);
    }

    @PostMapping("/addNewCategory")
    @ResponseBody
    public ResponseEntity<String> addNewCategory(@RequestBody Category newCategory){

            try{

                byte[] bytes = Base64.getDecoder().decode(newCategory.getImg());
                Path path = Paths.get(uploadPath+newCategory.getName()+".jpg");
                Files.write(path, bytes);

                categoryService.addCategory(new Category(null, newCategory.getName(), newCategory.getName()));


            }catch (Exception e){
                e.printStackTrace();
            }

        return ResponseEntity.ok("New category added!");
    }

    /*@PostMapping("/test")
    public ResponseEntity<String> handleFormData(@RequestBody Test test) {

        try {

            byte[] bytes = Base64.getDecoder().decode(test.getImg());
            Path path = Paths.get(uploadPath+"aaaa.jpg");
            Files.write(path, bytes);

        } catch (Exception e){
            e.printStackTrace();
        }


        return ResponseEntity.ok("Success");
    }*/

    @PostMapping("/addNewProduct")
    @ResponseBody
    public ResponseEntity<String> addNewProduct(@RequestBody ProductDTO newProduct){
        try{

            byte[] bytes = Base64.getDecoder().decode(newProduct.getImg());
            Path path = Paths.get(uploadPath+newProduct.getName()+".jpg");
            Files.write(path, bytes);

            productService.addProduct(new Product(null, newProduct.getName(), newProduct.getDescription(), newProduct.getPrice(), newProduct.getName(), newProduct.isAvailability(), categoryService.getCategory(newProduct.getCategory_id())));

        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("New product added!");
    }

    @DeleteMapping("/deleteCategory/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteCategory(@PathVariable(name = "id")Long id){

        Category category = new Category();

        try {
            category = categoryService.getCategory(id);

            categoryService.deleteCategory(category);

            // Получаем путь к изображению
            String imagePath = uploadPath + category.getImg() + ".jpg";

            // Удаляем файл изображения
            File imageFile = new File(imagePath);
            if (imageFile.exists()) {

                if (imageFile.delete()) {
                    System.out.println("Image deleted successfully");
                } else {
                    System.out.println("Failed to delete image");
                }
            } else {
                System.out.println("Image file not found");
            }

            return ResponseEntity.ok("Category is deleted!");
        } catch (Exception e) {
            System.err.println("Ошибка при удалении файла: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting category");
        }



    }

    @DeleteMapping("/deleteProduct/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteProduct(@PathVariable(name = "id")Long id){

        Product product = new Product();

        try {

            product = productService.getProduct(id);

            productService.deleteProduct(product);

            // Получаем путь к изображению
            String imagePath = uploadPath + product.getImg() + ".jpg";

            // Удаляем файл изображения
            File imageFile = new File(imagePath);
            if (imageFile.exists()) {

                if (imageFile.delete()) {
                    System.out.println("Image deleted successfully");
                } else {
                    System.out.println("Failed to delete image");
                }
            } else {
                System.out.println("Image file not found");
            }

            return ResponseEntity.ok("Product is deleted!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error deleting product");
        }

    }

    @DeleteMapping("/deleteOrder/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteOrder(@PathVariable(name = "id")Long id){

        Order order = new Order();

        try{
            order = orderService.getOrder(id);

            orderService.deleteOrder(order);

        }catch (Exception e){

            e.printStackTrace();

        }

        return ResponseEntity.ok("Order is deleted!");

    }

    @DeleteMapping("/deleteMessage/{id}")
    @ResponseBody
    public ResponseEntity<String> deleteMessage(@PathVariable(name = "id")Long id){

        Message message = new Message();

        try{
            message = messageService.getMessage(id);
            messageService.deleteMessage(message);

        }catch (Exception e){

            e.printStackTrace();

        }

        return ResponseEntity.ok("Message is deleted!");

    }


    @PostMapping("/editCategory")
    @ResponseBody
    public ResponseEntity<String> editCategory(@RequestBody Category updateCategory){

        try{

            Category category = categoryService.getCategory(updateCategory.getId());

            if(updateCategory.getImg() != null && !updateCategory.getImg().equals("") && !updateCategory.getImg().equals(category.getImg())){

                String imagePath = uploadPath + category.getImg() + ".jpg";

                File imageFile = new File(imagePath);
                if (imageFile.exists()) {

                    if (imageFile.delete()) {
                        System.out.println("Image deleted successfully");
                    } else {
                        System.out.println("Failed to delete image");
                    }
                } else {
                    System.out.println("Image file not found");
                }

                byte[] bytes = Base64.getDecoder().decode(updateCategory.getImg());
                Path path = Paths.get(uploadPath+updateCategory.getName()+".jpg");
                Files.write(path, bytes);

                categoryService.saveCategory(new Category(updateCategory.getId(), updateCategory.getName(), updateCategory.getName()));

            } else {

                categoryService.saveCategory(new Category(updateCategory.getId(), updateCategory.getName(), category.getImg()));

            }



        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("The category has been updated!");

    }

    @PostMapping("/editProduct")
    @ResponseBody
    public ResponseEntity<String> editProduct(@RequestBody ProductDTO updateProduct){

        try{

            Product product = productService.getProduct(updateProduct.getId());

            if(updateProduct.getImg() != null && !updateProduct.getImg().equals("") && !updateProduct.getImg().equals(product.getImg())){

                String imagePath = uploadPath + product.getImg() + ".jpg";

                File imageFile = new File(imagePath);
                if (imageFile.exists()) {

                    if (imageFile.delete()) {
                        System.out.println("Image deleted successfully");
                    } else {
                        System.out.println("Failed to delete image");
                    }
                } else {
                    System.out.println("Image file not found");
                }

                byte[] bytes = Base64.getDecoder().decode(updateProduct.getImg());
                Path path = Paths.get(uploadPath+updateProduct.getName()+".jpg");
                Files.write(path, bytes);

                productService.saveProduct(new Product(updateProduct.getId(), updateProduct.getName(), updateProduct.getDescription(), updateProduct.getPrice(), updateProduct.getName(), updateProduct.isAvailability(), categoryService.getCategory(updateProduct.getCategory_id())));

            } else {

                productService.saveProduct(new Product(updateProduct.getId(), updateProduct.getName(), updateProduct.getDescription(), updateProduct.getPrice(), product.getImg(), updateProduct.isAvailability(), categoryService.getCategory(updateProduct.getCategory_id())));

            }



        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("The product has been updated!");

    }

    @PostMapping("/editOrder")
    @ResponseBody
    public ResponseEntity<String> editOrder(@RequestBody OrderDTO updateOrder){

        try{

            Order order = orderService.getOrder(updateOrder.getId());
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
            java.util.Date utilDate = dateFormat.parse(updateOrder.getDate());

            orderService.saveOrder(new Order(updateOrder.getId(), updateOrder.getName(), updateOrder.getNumber(), updateOrder.getAddress(), updateOrder.getAmount(), new java.sql.Date(utilDate.getTime()), productService.getProduct(updateOrder.getProduct_id())));

        }catch (Exception e){
            e.printStackTrace();
        }

        return ResponseEntity.ok("The order has been updated!");

    }







}
