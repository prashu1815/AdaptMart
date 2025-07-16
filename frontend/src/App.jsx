import './App.css';
import Homepage from './Components/Homepage';
import Login from './Components/Login';

import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Register';
import { useState,useEffect } from 'react';
import Products from './Components/products';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import AddProduct from './Components/AddProduct';
import AllOrders from './Components/AllOrders';
import UpdateProduct from './Components/UpdateProduct';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <Router>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Homepage/>} />
        <Route path="/shop" element={<Products/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/user" element={<Orders/>}/>
        <Route path="/Admin/add" element={<AddProduct/>}/>
        <Route path="/Admin/orders" element={<AllOrders/>} />
        <Route path="/admin/update" element={<UpdateProduct/>} />
      </Routes>
    </Router>
  );
}

export default App;