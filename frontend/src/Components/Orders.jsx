import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('currentUser'));

    if (!token || !user) {
      alert("Please login to view your orders.");
      return;
    }

    axios.get(`http://localhost:8080/orders/fetch?uid=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
        alert("Failed to load orders.");
      });
  }, []);

  return (
    <div className="orders-wrapper">
      <h2 className="orders-heading">🧾 Your Orders</h2>
      {orders.length === 0 ? (
        <div className="no-orders-message">
          <p>No orders found. Start shopping now!</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.orderId} className="order-card">
              <div className="order-header">
                <div>
                  <h4>Order #{order.orderId}</h4>
                  <p className="order-date">
                    {new Date(order.orderDate).toLocaleDateString()} at{" "}
                    {new Date(order.orderDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`status-chip ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>

              <div className="order-items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <div className="order-item-info">
                      <p className="item-name">{item.productName}</p>
                      <p className="item-meta">Qty: {item.quantity} • ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="order-footer">
                <span className="order-total">Total: ₹{order.totalPrice}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Orders;
