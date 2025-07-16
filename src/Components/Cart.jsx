import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Cart.css';

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!token || !user) {
      alert("Please login to view your cart.");
      return;
    }

    axios.get(`http://localhost:8080/cart/getall?uid=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      const productsWithQuantities = res.data.map(product => ({
        ...product,
        quantity: product.quantity || 1
      }));
      setCartProducts(productsWithQuantities);
    })
    .catch(err => {
      console.error("Error fetching cart products:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Session expired or unauthorized. Please log in again.");
        localStorage.clear();
        window.location.href = '/login';
      } else {
        alert("Failed to load cart products.");
      }
    });
  }, []);

  const updateQuantity = (index, delta) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const updatedProduct = { ...cartProducts[index] };
    const newQuantity = Math.max(1, updatedProduct.quantity + delta);

    axios.put(`http://localhost:8080/cart/update`, {
      userId: user.id,
      productId: updatedProduct.product_Id,
      quantity: newQuantity
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(() => {
      setCartProducts(prev =>
        prev.map((item, i) =>
          i === index ? { ...item, quantity: newQuantity } : item
        )
      );
    })
    .catch(err => {
      console.error("Failed to update quantity:", err);
      alert("Error updating quantity. Please try again.");
    });
  };

  const calculateTotal = () => {
    return cartProducts.reduce((acc, item) => acc + item.product_Price * item.quantity, 0);
  };

  const handlePlaceOrder = () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:8080/orders/place?userId=${user.id}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      alert("Order placed successfully!");
      setCartProducts([]);
    })
    .catch(err => {
      console.error("Order failed:", err);
      alert("Failed to place order.");
    });
  };

  return (
    <div className="cart-main-container">
      <div className="cart-items-container">
        <h2>Your Cart</h2>
        {cartProducts.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartProducts.map((product, index) => (
            <div className="cart-item" key={product.product_Id}>
              <div className="cart-image-container">
                <img src={product.imageUrl} alt={product.product_Name} className="cart-image" />
              </div>
              <div className="cart-details">
                <h3>{product.product_Name}</h3>
                <p>{product.product_Description}</p>
                <p>Price: ₹{product.product_Price}</p>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(index, -1)}>-</button>
                  <span>{product.quantity}</span>
                  <button onClick={() => updateQuantity(index, 1)}>+</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="cart-summary-container">
        <h3>Order Summary</h3>
        <p>Total Items: {cartProducts.reduce((acc, item) => acc + item.quantity, 0)}</p>
        <p>Total Price: ₹{calculateTotal()}</p>
        <button className="place-order-btn" onClick={handlePlaceOrder}>
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
