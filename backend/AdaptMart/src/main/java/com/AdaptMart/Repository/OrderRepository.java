package com.AdaptMart.Repository;

import com.AdaptMart.Dao.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Orders,Long> {
    List<Orders> findByUser_Id(Long userId);
}
