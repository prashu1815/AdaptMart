package com.AdaptMart.Controller;

import com.AdaptMart.Dao.Cart;
import com.AdaptMart.Dao.CartItem;
import com.AdaptMart.Dao.Product;
import com.AdaptMart.Dto.CartRequest;
import com.AdaptMart.Service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<String> add(@RequestBody CartRequest request) {
        cartService.addToCart(request.getUserId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok("Item added to cart");
    }

    @PutMapping("/update")
    public ResponseEntity<String> update(@RequestBody CartRequest request) {
        cartService.updateCartItem(request.getUserId(), request.getProductId(), request.getQuantity());
        return ResponseEntity.ok("Cart updated");
    }

    @DeleteMapping("/remove")
    public ResponseEntity<String> remove(@RequestParam Long userId, @RequestParam Long productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok("Item removed");
    }

    @GetMapping("/getall")
    public ResponseEntity<List<Product>> fetchAll(@RequestParam Long uid) {
        List<Product> products = cartService.fetch(uid);
        return ResponseEntity.ok(products);
    }
}
