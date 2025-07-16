import React, { useState } from 'react';
import axios from 'axios';
import '../Styles/AddProduct.css'; 

function AddProduct() {
  const [product, setProduct] = useState({
    product_Name: '',
    product_Description: '',
    imageUrl: '',
    product_rating: 0,
    product_Price: 0
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: name === 'product_rating' || name === 'product_Price' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await axios.post('http://localhost:8080/admin/add', product, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data === true) {
        alert('Product added successfully!');
        setProduct({
          product_Name: '',
          product_Description: '',
          imageUrl: '',
          product_rating: 0,
          product_Price: 0
        });
      } else {
        alert('Failed to add product.');
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Unauthorized or invalid request.');
    }
  };

  return (
    <div className="add-product-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit} className="add-product-form">
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
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          value={product.imageUrl}
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
          onChange={handleChange}
          step="0.01"
          required
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
