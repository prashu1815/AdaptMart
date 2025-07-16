package com.AdaptMart.Dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name="Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_Id;

    private String product_Name;

    private String imageUrl;

    private String product_Description;

    private int product_rating;

    private float product_Price;

}
