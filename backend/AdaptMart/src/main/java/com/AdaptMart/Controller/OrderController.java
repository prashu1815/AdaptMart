package com.AdaptMart.Controller;

import com.AdaptMart.Dao.Orders;
import com.AdaptMart.Dto.OrderResponse;
import com.AdaptMart.Service.OrderService;
import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<OrderResponse> placeOrder(@RequestParam Long userId) {
        Orders order = orderService.placeOrder(userId);
        OrderResponse response = orderService.mapToDTO(order);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/fetch")
    public List<Orders> getOrders(@RequestParam long uid){
        return orderService.getOrders(uid);
    }
}
