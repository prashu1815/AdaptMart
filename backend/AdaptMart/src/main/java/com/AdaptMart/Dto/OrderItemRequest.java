package com.AdaptMart.Dto;

import lombok.Data;

@Data
public class OrderItemRequest {

    private Long productId;
    private String productName;
    private float price;
    private int quantity;
}
