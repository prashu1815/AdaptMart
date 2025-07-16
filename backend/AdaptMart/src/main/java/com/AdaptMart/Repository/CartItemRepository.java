package com.AdaptMart.Repository;

import com.AdaptMart.Dao.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByCart_CartId(Long cartId);
}