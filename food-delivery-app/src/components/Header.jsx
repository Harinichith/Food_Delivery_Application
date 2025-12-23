import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';  // ✅ Separate CSS file

const Header = ({ user }) => {  // ✅ Accept user prop
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Mock cart items (since CartContext removed)
  const totalItems = 3;  // Replace with real cart data later

  return (
    <header className="header-main">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo-link">
          <div className="logo">
            <span className="logo-icon">🍕</span>
            <span className="logo-text">FoodHub</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/cart" 
            className={`nav-link cart-link ${location.pathname === '/cart' ? 'active' : ''}`}
          >
            Cart
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </Link>
          <Link to="/orders" className="nav-link">Orders</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`} />
        </button>

        {/* User Profile */}
        {user && (
          <div className="user-profile">
            <img 
              src={`https://i.pravatar.cc/40?u=${user.email || user.name}`} 
              alt="User" 
              className="user-avatar"
            />
            <span className="user-name">{user.name}</span>
            <button className="logout-btn">Logout</button>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link to="/cart" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Cart ({totalItems})
          </Link>
          <Link to="/orders" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
            Orders
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
