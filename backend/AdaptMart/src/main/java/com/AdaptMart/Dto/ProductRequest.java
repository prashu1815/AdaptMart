package com.AdaptMart.Dto;

import lombok.Data;

@Data
public class ProductRequest {

    private String product_Name;

    private String product_Description;

    private String imageUrl;

    private int product_rating;

    private float product_Price;


}
