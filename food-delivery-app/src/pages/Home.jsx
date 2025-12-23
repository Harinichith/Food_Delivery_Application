import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Bangalore');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [viewState, setViewState] = useState('home'); // 'home', 'restaurant-menu', 'food-detail', 'payment', 'order-success'
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(''); // 'card', 'upi', 'cod'

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const locations = ['Bangalore', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune'];

  const restaurantsData = [
    { 
      id: 1, 
      name: 'Pizza Palace', 
      cuisine: 'Italian • Pizza', 
      rating: 4.8, 
      time: '25 min', 
      fee: 50, 
      location: 'Bangalore', 
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400',
      foods: [
        {id:1,name:'Margherita Pizza',price:299,img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300', desc:'Classic cheese pizza'},
        {id:2,name:'Pepperoni Pizza',price:349,img:'https://images.unsplash.com/photo-1542994983-9debd9a33797?w=300', desc:'Spicy pepperoni pizza'},
        {id:3,name:'Pasta Alfredo',price:249,img:'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300', desc:'Creamy pasta delight'},
        {id:4,name:'Garlic Bread',price:149,img:'https://images.unsplash.com/photo-1582583823512-96366e567569?w=300', desc:'Crispy garlic bread'},
        {id:5,name:'Tiramisu',price:199,img:'https://images.unsplash.com/photo-1542994983-9debd9a33797?w=300', desc:'Italian dessert classic'}
      ]
    },
    { 
      id: 2, 
      name: 'Burger King', 
      cuisine: 'American • Burgers', 
      rating: 4.5, 
      time: '30 min', 
      fee: 40, 
      location: 'Mumbai', 
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400',
      foods: [
        {id:6,name:'Cheese Burger',price:199,img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300', desc:'Juicy beef patty'},
        {id:7,name:'BBQ Burger',price:229,img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300', desc:'BBQ sauce special'},
        {id:8,name:'Veggie Burger',price:179,img:'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300', desc:'Fresh veggie patty'},
        {id:9,name:'French Fries',price:99,img:'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=300', desc:'Crispy golden fries'},
        {id:10,name:'Onion Rings',price:129,img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=300', desc:'Crunchy rings'}
      ]
    },
    { 
      id: 3, 
      name: 'Sushi Spot', 
      cuisine: 'Japanese • Sushi', 
      rating: 4.7, 
      time: '35 min', 
      fee: 60, 
      location: 'Delhi', 
      image: 'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=400',
      foods: [
        {id:11,name:'California Roll',price:399,img:'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=300', desc:'Crab & avocado roll'},
        {id:12,name:'Salmon Nigiri',price:449,img:'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=300', desc:'Fresh salmon sushi'},
        {id:13,name:'Miso Soup',price:149,img:'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=300', desc:'Traditional miso'},
        {id:14,name:'Edamame',price:129,img:'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=300', desc:'Steamed soybeans'},
        {id:15,name:'Tempura Shrimp',price:299,img:'https://images.unsplash.com/photo-1579586140626-0e8e9f3defbf?w=300', desc:'Crispy shrimp tempura'}
      ]
    }
  ];

  useEffect(() => {
    const filtered = restaurantsData.filter(restaurant =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.location.toLowerCase().includes(selectedLocation.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  }, [searchTerm, selectedLocation]);

  const allFoods = restaurantsData.flatMap(r => r.foods.slice(0, 2));

  // Go to Payment Page
  const handleOrder = () => {
    setViewState('payment');
  };

  // ✅ PERFECT: Confirm Payment → Navigate to Order Success Page
  const handlePaymentConfirm = () => {
    if (!selectedPaymentMethod) return;
    setOrderConfirmed(true); // This triggers the order success screen
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderHeader = () => (
    <header className="home-header">
      <div className="header-content">
        <div className="logo">🍕 FoodHub</div>
        <div className="header-right">
          {user ? (
            <div className="user-menu">
              <span className="user-greeting">👋 Hi, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/" className="login-link">Login</Link>
          )}
        </div>
      </div>
    </header>
  );

  // ✅ PAYMENT PAGE - Perfect as is
  if (viewState === 'payment' && selectedFood) {
    const totalAmount = selectedFood.price + 50;

    return (
      <div className="payment-page">
        {renderHeader()}
        <div className="payment-container">
          <button 
            className="back-btn" 
            onClick={() => setViewState('food-detail')}
          >
            ← Back to Food
          </button>

          <div className="payment-hero">
            <div className="payment-icon">💳</div>
            <h1 className="payment-title">Complete Your Order</h1>
            <p className="payment-subtitle">Choose payment method</p>
          </div>

          <div className="order-summary">
            <div className="summary-item">
              <span>{selectedFood.name}</span>
              <span>₹{selectedFood.price}</span>
            </div>
            <div className="summary-item">
              <span>Delivery Fee</span>
              <span>₹50</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>₹{totalAmount}</strong>
            </div>
          </div>

          <div className="payment-methods">
            <h3>Payment Methods</h3>
            <div className="method-grid">
              <div 
                className={`payment-method-card ${selectedPaymentMethod === 'card' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('card')}
              >
                <div className="method-icon">💳</div>
                <h4>Credit/Debit Card</h4>
                <p>Visa, MasterCard, Rupay</p>
              </div>
              <div 
                className={`payment-method-card ${selectedPaymentMethod === 'upi' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('upi')}
              >
                <div className="method-icon">📱</div>
                <h4>UPI</h4>
                <p>Google Pay, PhonePe, Paytm</p>
              </div>
              <div 
                className={`payment-method-card ${selectedPaymentMethod === 'cod' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('cod')}
              >
                <div className="method-icon">💰</div>
                <h4>Cash on Delivery</h4>
                <p>Pay when delivered</p>
              </div>
            </div>
          </div>

          <button 
            className={`confirm-payment-btn ${!selectedPaymentMethod ? 'disabled' : ''}`}
            onClick={handlePaymentConfirm}
            disabled={!selectedPaymentMethod}
          >
            Confirm Payment ₹{totalAmount}
          </button>
        </div>
      </div>
    );
  }

  // ✅ ORDER SUCCESS PAGE - Shows after clicking Confirm Payment
  if (orderConfirmed && selectedFood) {
    const totalAmount = selectedFood.price + 50;
    const orderId = `ORD${Math.floor(Math.random() * 1000000)}`;

    return (
      <div className="order-success-page">
        {renderHeader()}
        <div className="success-container">
          <div className="success-icon-large">✅</div>
          <h1 className="success-title-large">Order Confirmed Successfully!</h1>
          
          <div className="order-success-details">
            <div className="success-card">
              <div className="success-item">
                <span>Order ID</span>
                <strong>#{orderId}</strong>
              </div>
              <div className="success-item">
                <span>Item</span>
                <strong>{selectedFood.name}</strong>
              </div>
              <div className="success-item">
                <span>Payment Method</span>
                <strong>
                  {selectedPaymentMethod === 'card' ? 'Credit/Debit Card' : 
                   selectedPaymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery'}
                </strong>
              </div>
              <div className="success-item total">
                <span>Total Amount</span>
                <strong>₹{totalAmount}</strong>
              </div>
            </div>
          </div>

          <p className="success-message-large">
            Your order has been placed successfully! Estimated delivery: <strong>25-30 mins</strong> 🚚
          </p>

          <button 
            className="back-home-btn-large" 
            onClick={() => {
              setOrderConfirmed(false);
              setViewState('home');
              setSelectedRestaurant(null);
              setSelectedFood(null);
              setSelectedPaymentMethod('');
            }}
          >
            ← Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // Food Detail View
  if (viewState === 'food-detail' && selectedFood) {
    return (
      <div className="food-detail-view">
        {renderHeader()}
        <div className="container">
          <button 
            className="back-btn" 
            onClick={() => setViewState('restaurant-menu')}
          >
            ← Back to Menu
          </button>
          
          <div className="detail-content">
            <div className="detail-image" style={{ backgroundImage: `url(${selectedFood.img})` }}></div>
            <div className="detail-info">
              <h1 className="detail-title">{selectedFood.name}</h1>
              <p className="detail-desc">{selectedFood.desc}</p>
              <div className="detail-price">₹{selectedFood.price}</div>
              <button className="order-btn" onClick={handleOrder}>
                Order Now - ₹{selectedFood.price}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Restaurant Menu View
  if (viewState === 'restaurant-menu' && selectedRestaurant) {
    return (
      <div className="restaurant-menu-view">
        {renderHeader()}
        <div className="container">
          <button 
            className="back-btn" 
            onClick={() => setViewState('home')}
          >
            ← Back to Restaurants
          </button>
          
          <div className="menu-hero">
            <div className="menu-hero-image" style={{ backgroundImage: `url(${selectedRestaurant.image})` }}></div>
            <div className="menu-hero-content">
              <h1 className="menu-title">{selectedRestaurant.name}</h1>
              <div className="menu-stats">
                <span>⭐ {selectedRestaurant.rating}</span>
                <span>{selectedRestaurant.time}</span>
                <span>₹{selectedRestaurant.fee} delivery</span>
              </div>
            </div>
          </div>

          <div className="menu-items-grid">
            {selectedRestaurant.foods.map(food => (
              <div 
                key={food.id}
                className="menu-food-card"
                onClick={() => {
                  setViewState('food-detail');
                  setSelectedFood(food);
                }}
              >
                <div className="menu-food-image" style={{ backgroundImage: `url(${food.img})` }}></div>
                <div className="menu-food-content">
                  <h3 className="menu-food-title">{food.name}</h3>
                  <p className="menu-food-desc">{food.desc}</p>
                  <div className="menu-food-price">₹{food.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Home View
  return (
    <div className="food-delivery-home">
      {renderHeader()}
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Order Delicious Food Online</h1>
          <p className="hero-subtitle">Discover amazing restaurants near you</p>
        </div>
      </section>

      <section className="search-section">
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search restaurants or food..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="location-selector">
            <div 
              className="location-trigger"
              onClick={() => setShowLocationDropdown(!showLocationDropdown)}
            >
              📍 {selectedLocation}
              <span className="dropdown-icon">▼</span>
            </div>
            {showLocationDropdown && (
              <div className="location-dropdown">
                {locations.map(loc => (
                  <div 
                    key={loc}
                    className="location-option"
                    onClick={() => {
                      setSelectedLocation(loc);
                      setShowLocationDropdown(false);
                    }}
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="restaurants-section">
        <h2 className="section-title">Restaurants in {selectedLocation}</h2>
        <div className="cards-grid">
          {filteredRestaurants.map(restaurant => (
            <div 
              key={restaurant.id} 
              className="restaurant-card"
              onClick={() => {
                setSelectedRestaurant(restaurant);
                setViewState('restaurant-menu');
              }}
            >
              <div className="card-image" style={{ backgroundImage: `url(${restaurant.image})` }}></div>
              <div className="card-content">
                <h3 className="card-title">{restaurant.name}</h3>
                <p className="card-cuisine">{restaurant.cuisine}</p>
                <div className="card-stats">
                  <span className="rating">⭐ {restaurant.rating}</span>
                  <span className="time">{restaurant.time}</span>
                  <span className="fee">₹{restaurant.fee}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="foods-section">
        <h2 className="section-title">Popular Foods</h2>
        <div className="cards-grid">
          {allFoods.slice(0, 12).map(food => (
            <div 
              key={food.id} 
              className="food-card"
              onClick={() => {
                setSelectedFood(food);
                setViewState('food-detail');
              }}
            >
              <div className="card-image" style={{ backgroundImage: `url(${food.img})` }}></div>
              <div className="card-content">
                <h3 className="card-title">{food.name}</h3>
                <div className="card-price">₹{food.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
