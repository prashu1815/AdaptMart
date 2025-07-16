import React from 'react';
import '../Styles/Category.css';
import electronicsImg from '../assets/electronics.jpeg';
import fashionImg from '../assets/fashion.jpg';
import homeImg from '../assets/Home.png';
import fitnessImg from '../assets/fitness.jpeg';
import booksImg from '../assets/books.jpeg';
import toysImg from '../assets/toys.jpg';

const categories = [
  { title: 'Electronics', image: electronicsImg },
  { title: 'Fashion', image: fashionImg },
  { title: 'Home & Kitchen', image: homeImg },
  { title: 'Fitness', image: fitnessImg },
  { title: 'Books', image: booksImg },
  { title: 'Toys', image: toysImg },
];

function Category() {
  const rows = [];
  for (let i = 0; i < categories.length; i += 2) {
    rows.push(categories.slice(i, i + 2));
  }

  return (
    <div className="category-section">
      <h2>Shop by Category</h2>
      <div className="category-grid">
        {rows.map((pair, index) => (
          <div className="category-row" key={index}>
            {pair.map((cat, idx) => (
              <div className="category-wrapper" key={idx}>
                <h3 className="category-title">{cat.title}</h3>
                <div className="category-card">
                  <img src={cat.image} alt={cat.title} className="category-image" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Category;
