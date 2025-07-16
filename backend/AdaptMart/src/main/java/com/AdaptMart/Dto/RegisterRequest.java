package com.AdaptMart.Dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;


@Data
public class RegisterRequest {

    private String userName;

    private String email;

    private String password;

}
