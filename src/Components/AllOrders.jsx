import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/AllOrders.css';

function AllOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:8080/admin/allorders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => setOrders(res.data))
    .catch(err => {
      console.error("Failed to fetch orders", err);
      alert("Failed to fetch orders. Please try again.");
    });
  }, []);

  return (
    <div className="admin-orders-container">
      <h2>All Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        orders.map(order => (
          <div key={order.orderId} className="order-card">
            <div className="order-header">
              <span><strong>Order ID:</strong> #{order.orderId}</span>
              <span><strong>Status:</strong> {order.status}</span>
            </div>
            <div className="order-user">
              <strong>User:</strong> {order.user.userName} ({order.user.email})
            </div>
            <div className="order-items">
              {order.items.map(item => (
                <div key={item.id} className="item-row">
                  <span>{item.productName}</span>
                  <span>₹{item.price.toLocaleString()}</span>
                  <span>Qty: {item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="order-footer">
              <span><strong>Total:</strong> ₹{order.totalPrice.toLocaleString()}</span>
              <span><strong>Placed on:</strong> {new Date(order.orderDate).toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllOrders;
