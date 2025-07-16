package com.AdaptMart.Dto;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderResponse {
    private Long orderId;
    private String userName;
    private String email;
    private List<OrderItemRequest> items;
    private float totalPrice;
    private LocalDateTime orderDate;
    private String status;
}
