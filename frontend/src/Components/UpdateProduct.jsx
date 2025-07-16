import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/UpdateProduct.css';

function UpdateProduct() {
  const [product, setProduct] = useState({
    product_Id: '',
    product_Name: '',
    product_Description: '',
    product_rating: 0,
    product_Price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'product_rating' || name === 'product_Price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8080/admin/update', product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data === true) {
        alert('Product updated successfully!');
        setProduct({
          product_Id: '',
          product_Name: '',
          product_Description: '',
          product_rating: 0,
          product_Price: 0
        });
      } else {
        alert('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Unauthorized or invalid request.');
    }
  };

  return (
    <div className="update-product-container">
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit} className="update-product-form">
        <input
          type="number"
          name="product_Id"
          placeholder="Product ID"
          value={product.product_Id}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="product_Name"
          placeholder="Product Name"
          value={product.product_Name}
          onChange={handleChange}
          required
        />
        <textarea
          name="product_Description"
          placeholder="Product Description"
          value={product.product_Description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="product_rating"
          placeholder="Rating (1–5)"
          value={product.product_rating}
          min="1"
          max="5"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="product_Price"
          placeholder="Price"
          value={product.product_Price}
          step="0.01"
          onChange={handleChange}
          required
        />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
