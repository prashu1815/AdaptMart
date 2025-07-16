package com.AdaptMart.Dao;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "Users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String userName;

    private String email;

    private String password;

    private String role;

}
