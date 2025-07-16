import React from 'react';
import '../Styles/Homepage.css';
import bgImage from '../assets/bg.png';
import Category from './Category';
import AboutUs from './Aboutus';
import Footer from './Footer';

function Homepage() {
  return (
    <div>

      <div
        className="homepage"
        style={{
          backgroundImage: `url(${bgImage})`
        }}
      >
        <div className="homepage__content">
          <h1>Discover the Best Deals at <span>AdaptMart</span></h1>
          <p>Shop electronics, fashion, home essentials, and more — all in one place.</p>
          <button className="homepage__btn">Start Shopping</button>
        </div>
      </div>


      <div className="category">
        <Category />
      </div>
          <AboutUs/>
          <Footer/>
    </div>
  );
}

export default Homepage;
