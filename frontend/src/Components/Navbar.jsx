import React, { useEffect, useState } from 'react';
import '../Styles/Navbar.css';
import { FaUserCircle } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode"; // ✅ fixed import

function Navbar() {
  const [currentUser, setCurrentUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('currentUser');

    if (token && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);

        const decoded = jwtDecode(token); // ✅ fixed usage
        setRole(decoded.role);
      } catch (error) {
        console.error("Error loading user or decoding token:", error);
        setCurrentUser(null);
        setRole(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <div className="logo">AdaptMart</div>
        <div className="navbar__spacer"></div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/shop">Shop</a></li>

          {/* USER-only links */}
          {role === "USER" && (
            <>
              <li><a href="/cart">Cart</a></li>
              <li><a href="/orders">Orders</a></li>
            </>
          )}

          {/* ADMIN-only links */}
          {role === "ADMIN" && (
            <>
              <li><a href="/Admin/add">AddProducts</a></li>
              <li><a href="/Admin/orders">Orders</a></li>
              <li><a href="/Admin/update">Update</a></li>
            </>
          )}

          {/* Login / Profile */}
          <li>
            {currentUser ? (
              <div className="profile-menu">
               
                 
             
                <button className="logout-btn" onClick={handleLogout}>    <FaUserCircle style={{ marginRight: "6px", verticalAlign: "middle" }} />
                  Hi {currentUser.userName?.split(" ")[0] || "User"}
             </button>
              </div>
            ) : (
              <a href="/login">Login</a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
