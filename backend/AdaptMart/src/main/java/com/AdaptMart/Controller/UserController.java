package com.AdaptMart.Controller;

import com.AdaptMart.Dao.Product;
import com.AdaptMart.Service.ProductService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/get")
public class UserController {

    private final ProductService productService;


    public UserController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<Product> getAllProducts(){
        return productService.getProducts();
    }


}
