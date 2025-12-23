import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Checkout = () => {
  const { totalAmount, clearCart } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    payment: 'cod'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="glass p-10">
            <h2 className="text-3xl font-bold text-white mb-8">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full p-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="10 digit phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              
              <div>
                <label className="block text-white font-semibold mb-3">Delivery Address</label>
                <textarea
                  required
                  rows="4"
                  className="w-full p-4 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 resize-none"
                  placeholder="House number, street, area, city, pincode"
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">Payment Method</label>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={formData.payment === 'cod'}
                      onChange={(e) => setFormData({...formData, payment: e.target.value})}
                      className="w-5 h-5 text-yellow-400"
                    />
                    <span className="text-white">Cash on Delivery</span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="online"
                      checked={formData.payment === 'online'}
                      onChange={(e) => setFormData({...formData, payment: e.target.value})}
                      className="w-5 h-5 text-yellow-400"
                    />
                    <span className="text-white">Pay Online</span>
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn w-full py-5 text-xl font-bold"
              >
                {loading ? 'Processing...' : `Pay ₹${(totalAmount + 50).toFixed(2)}`}
              </button>
            </form>
          </div>

          <div className="glass p-10">
            <h3 className="text-2xl font-bold text-white mb-8">Order Summary</h3>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>₹50</span>
              </div>
              <div className="h-px bg-white/30 my-6"></div>
              <div className="flex justify-between text-3xl font-bold text-white">
                <span>Total:</span>
                <span>₹{(totalAmount + 50).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
