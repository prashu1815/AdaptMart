package com.AdaptMart.Repository;

import com.AdaptMart.Dao.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product,Long> {
        Optional<Product> findById(Long productId);

}
