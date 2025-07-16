package com.AdaptMart.Controller;

import com.AdaptMart.Dao.Orders;
import com.AdaptMart.Dto.ProductRequest;
import com.AdaptMart.Dto.UpdateRequest;
import com.AdaptMart.Service.OrderService;
import com.AdaptMart.Service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/admin")
public class AdminController {

    private final ProductService productService;

    private final OrderService orderService;

    public AdminController(ProductService productService, OrderService orderService){
        this.productService=productService;
        this.orderService = orderService;
    }


    @PostMapping("/add")
    public boolean AddProduct(@RequestBody ProductRequest request){
        return productService.addProduct(request);
    }

    @PostMapping("/update")
    public boolean updateProduct(@RequestBody UpdateRequest request){
        return productService.updateProduct(request);
    }

    @GetMapping("/allorders")
    public List<Orders> fetchOrders(){
      return orderService.getALlOrders();
    }

}
