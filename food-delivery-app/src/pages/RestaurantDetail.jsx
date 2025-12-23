import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import MenuItem from '../components/MenuItem';
import './RestaurantDetail.css';  // ✅ Separate CSS file

const mockRestaurants = {
  1: {
    id: 1,
    name: 'Pizza Palace',
    rating: 4.8,
    cuisine: 'Italian • Pizza • Fast Food',
    deliveryTime: '25 min',
    deliveryFee: 50,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600',
    menu: [
      { id: 1, name: 'Margherita Pizza', description: 'Classic cheese pizza with fresh basil', price: 299, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300' },
      { id: 2, name: 'Pepperoni Pizza', description: 'Spicy pepperoni with mozzarella', price: 349, image: 'https://images.unsplash.com/photo-1542994983-9debd9a33797?w=300' },
      { id: 3, name: 'Pasta Alfredo', description: 'Creamy pasta with parmesan cheese', price: 249, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300' },
      { id: 4, name: 'Garlic Bread', description: 'Freshly baked garlic breadsticks', price: 149, image: 'https://images.unsplash.com/photo-1582583823512-96366e567569?w=300' }
    ]
  },
  2: {
    id: 2,
    name: 'Burger House',
    rating: 4.5,
    cuisine: 'American • Burgers • Fries',
    deliveryTime: '30 min',
    deliveryFee: 40,
    image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=600',
    menu: [
      { id: 5, name: 'Classic Cheeseburger', description: 'Beef patty with cheese and veggies', price: 199, image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300' },
      { id: 6, name: 'BBQ Burger', description: 'BBQ sauce with onion rings', price: 229, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300' },
      { id: 7, name: 'French Fries', description: 'Crispy golden french fries', price: 99, image: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300' }
    ]
  }
};

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setRestaurant(mockRestaurants[id]);
      setLoading(false);
    }, 800);
  }, [id]);

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2 className="loading-title">Loading Menu...</h2>
          <p className="loading-subtitle">Just a moment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-detail-page">
      {/* Hero Section */}
      <div className="restaurant-hero">
        <div className="hero-overlay"></div>
        <div className="container">
          <Link to="/" className="back-btn">← Back to Home</Link>
          <div className="hero-content">
            <div className="restaurant-image" style={{ backgroundImage: `url(${restaurant.image})` }}>
              <div className="image-overlay"></div>
            </div>
            <div className="restaurant-info">
              <h1 className="restaurant-name">{restaurant.name}</h1>
              <div className="restaurant-stats">
                <div className="stat rating">
                  <span className="stat-icon">⭐</span>
                  <span className="stat-value">{restaurant.rating}</span>
                </div>
                <div className="stat time">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-value">{restaurant.deliveryTime}</span>
                </div>
                <div className="stat fee">
                  <span className="stat-icon">₹</span>
                  <span className="stat-value">{restaurant.deliveryFee}</span>
                </div>
              </div>
              <p className="restaurant-cuisine">{restaurant.cuisine}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Section */}
      <div className="container">
        <div className="menu-section">
          <div className="section-header">
            <h2 className="section-title">Menu ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} in cart)</h2>
            <Link to="/cart" className="cart-summary-btn">
              View Cart ({cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}₹)
            </Link>
          </div>
          
          <div className="menu-grid">
            {restaurant.menu.map(item => (
              <MenuItem 
                key={item.id} 
                item={item} 
                onAddToCart={addToCart}
                cartItems={cartItems}
              />
            ))}
          </div>
        </div>

        {/* Cart Summary */}
        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Quick Cart Summary</h3>
            <div className="cart-items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item-mini">
                  <span>{item.name}</span>
                  <span>{item.quantity} × ₹{item.price} = ₹{(item.quantity * item.price).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="cart-total">
              Total: ₹{cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
            </div>
            <Link to="/cart" className="checkout-btn">Proceed to Checkout</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail;
