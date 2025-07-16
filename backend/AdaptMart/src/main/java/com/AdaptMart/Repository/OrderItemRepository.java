package com.AdaptMart.Repository;

import com.AdaptMart.Dao.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem,Long> {
}
