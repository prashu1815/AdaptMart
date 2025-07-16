import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
const handleAddToCart = (product) => {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  const token = localStorage.getItem('token');

  if (!user) {
    alert("Please log in to add items to your cart.");
    return;
  }

  const cartItem = {
    userId: user.id,
    productId: product.product_Id,
    quantity: 1
  };

  axios.post('http://localhost:8080/cart/add', cartItem, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    alert("Item added to cart!");
    console.log("Cart response:", res.data);
    
  })
  .catch(err => {
    console.error("Error adding to cart:", err);
    alert("Failed to add item to cart.");
  });
};
  useEffect(() => {
    const token = localStorage.getItem('token');

    axios.get('http://localhost:8080/get/products', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setProducts(res.data);
      console.log(token);
    })
    .catch(err => {
      console.error("Error fetching products:", err);
      if (err.response?.status === 403 || err.response?.status === 401) {
        alert("Unauthorized. Please login again.");
      }
    });
  }, []);

  return (
 <div className="products-container">
  <h2>Our Products</h2>
  <div className="product-grid">
    {products.map(product => (
      <div className="product-card" key={product.product_Id} >
        <img 
          src={product.imageUrl} 
          alt={product.product_Name} 
          className="product-image"
        />
        <div className="product-card-content">
          <h3>{product.product_Name}</h3>
          <p>Price: ₹{product.product_Price}</p>
          <p>Rating: ⭐{product.product_rating}</p>
          <p>{product.product_Description}</p>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    ))}
  </div>
</div>



  );
}

export default Products;
