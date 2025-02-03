import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../HomePage/HomePage.css';
import axios from 'axios';
import CartContext from '../context/CartContext';

function HomePage() {
  const [foods, setFoods] = useState([]);
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('https://my-project-5-v43w.onrender.com/home/')
      .then((response) => {
        setFoods(response.data);
      })
      .catch((ex) => console.log(ex));
  }, []);

  const addToCart = (food) => {
    setCart([...cart, food]);
  };

  const handleSubmitCart = () => {
    if (cart.length === 0) {
      alert('Your cart is empty. Please add items before proceeding.');
    } else {
      navigate('/order'); // Navigate to the OrderPage
    }
  };

  return (
    <div className="home-page">
      <header className="header">Nyam Tam</header>
      <h1 className="home-title">Menu</h1>
      <div className="food-items-container">
        {foods.map((food) => (
          <div key={food.id} className="food-item">
            <img src={food.img_url} alt={food.name} className="food-image" />
            <h3 className="food-name">{food.name}</h3>
            <p className="food-description">{food.description}</p>
            <p className="food-price">Tzs {food.price}</p>
            <button onClick={() => addToCart(food)} className="add-to-cart-btn">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <button className="submit-cart-btn" onClick={handleSubmitCart}>
        Submit Cart
      </button>
      <footer className="footer">
        <p>Contact us: 0623101586</p>
      </footer>
    </div>
  );
}

export default HomePage;
