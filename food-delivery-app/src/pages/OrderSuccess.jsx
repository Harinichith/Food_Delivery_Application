import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen pt-24 flex items-center justify-center">
      <div className="glass p-16 rounded-3xl text-center max-w-2xl mx-auto animate-bounce">
        <div className="text-8xl mb-8">✅</div>
        <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
          Order Placed Successfully!
        </h1>
        <p className="text-xl text-gray-200 mb-12 max-w-md mx-auto leading-relaxed">
          Your order has been confirmed. Our team is preparing your delicious food 
          and it will be delivered shortly. Thank you for choosing FoodHub!
        </p>
        <div className="space-x-4">
          <Link to="/" className="btn px-12 py-4 text-lg">Order More</Link>
          <Link to="/cart" className="btn-secondary px-12 py-4 text-lg">View Orders</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
