package com.AdaptMart.Service;

import com.AdaptMart.Dao.Cart;
import com.AdaptMart.Dao.CartItem;
import com.AdaptMart.Dao.Product;
import com.AdaptMart.Dto.CartRequest;
import com.AdaptMart.Repository.CartItemRepository;
import com.AdaptMart.Repository.CartRepository;
import com.AdaptMart.Repository.ProductRepository;
import com.AdaptMart.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartItemRepository cir;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void addToCart(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> createCartForUser(userId));

        Optional<CartItem> existingItem = cart.getItems()
                .stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + quantity);
        } else {
            CartItem newItem = new CartItem();
            newItem.setProductId(productId);
            newItem.setQuantity(quantity);
            newItem.setCart(cart);
            cart.getItems().add(newItem);
        }

        cartRepository.save(cart);
    }

    private Cart createCartForUser(Long userId) {
        Cart cart = new Cart();
        cart.setItems(new ArrayList<>());

        cart.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));

        return cartRepository.save(cart);
    }

    public void updateCartItem(Long userId, Long productId, int quantity) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow();
        for (CartItem item : cart.getItems()) {
            if (item.getProductId().equals(productId)) {
                item.setQuantity(quantity);
                break;
            }
        }
        cartRepository.save(cart);

    }

    public void removeFromCart(Long userId, Long productId) {
        Cart cart = cartRepository.findByUserId(userId).orElseThrow();

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));

        cartRepository.save(cart);
    }

    public List<Product> fetch(Long uid) {
        Cart cart = cartRepository.findByUserId(uid).orElseThrow(() -> new RuntimeException("Cart not found"));
        // Fetch products by productId
        List<CartItem> cartItems = cir.findByCart_CartId(cart.getCartId());

        // Fetch products by productId
        List<Product> products = new ArrayList<>();

        for (CartItem item : cartItems) {
            productRepository.findById(item.getProductId()).ifPresent(products::add);
        }

        return products;
    }
}
