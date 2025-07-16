package com.AdaptMart.Dto;

import lombok.Data;

@Data
public class UpdateRequest {

    private Long product_Id;

    private String product_Name;

    private String product_Description;

    private int product_rating;

    private float product_Price;
}
