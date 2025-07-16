package com.AdaptMart.Service;

import com.AdaptMart.Dao.*;
import com.AdaptMart.Dto.OrderItemRequest;
import com.AdaptMart.Dto.OrderResponse;
import com.AdaptMart.Repository.CartRepository;
import com.AdaptMart.Repository.OrderRepository;
import com.AdaptMart.Repository.ProductRepository;
import jakarta.persistence.criteria.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private OrderRepository orderRepository;
    
    @Autowired
    private ProductRepository productRepo;


    public Orders placeOrder(Long userId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        Orders order = new Orders();
        order.setUser(cart.getUser());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PLACED");

        float total = 0;

        for (CartItem cartItem : cart.getItems()) {
            OrderItem orderItem = new OrderItem();
            orderItem.setProductId(cartItem.getProductId());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(getProductPrice(cartItem.getProductId()));
            orderItem.setProductName(getProductName(cartItem.getProductId()));
            orderItem.setOrder(order);

            total += orderItem.getPrice() * cartItem.getQuantity();
            order.getItems().add(orderItem);
        }

        order.setTotalPrice(total);

        cart.getItems().clear(); 
        cartRepository.save(cart);

        return orderRepository.save(order);
    }
    
    public Optional<Product> getProduct(Long productId){
       return productRepo.findById(productId);
    }
    
    private float getProductPrice(Long productId) {
        Product product = getProduct(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        return product.getProduct_Price();
    }

    private String getProductName(Long productId) {
        Product product = getProduct(productId)
                .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productId));
        return product.getProduct_Name();
    }

    public OrderResponse mapToDTO(Orders order) {
        OrderResponse dto = new OrderResponse();
        dto.setOrderId(order.getOrderId());
        dto.setUserName(order.getUser().getUserName());
        dto.setEmail(order.getUser().getEmail());
        dto.setTotalPrice(order.getTotalPrice());
        dto.setOrderDate(order.getOrderDate());
        dto.setStatus(order.getStatus());

        List<OrderItemRequest> itemDTOs = order.getItems().stream().map(item -> {
            OrderItemRequest itemDTO = new OrderItemRequest();
            itemDTO.setProductId(item.getProductId());
            itemDTO.setProductName(item.getProductName());
            itemDTO.setPrice(item.getPrice());
            itemDTO.setQuantity(item.getQuantity());
            return itemDTO;
        }).toList();

        dto.setItems(itemDTOs);
        return dto;
    }

    public List<Orders> getOrders(long uid) {
        return orderRepository.findByUser_Id(uid);
    }

    public  List<Orders> getALlOrders() {
        return orderRepository.findAll();
    }

}
