package com.AdaptMart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@SpringBootApplication
@EnableMethodSecurity
public class AdaptMartApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdaptMartApplication.class, args);
	}

}
