import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { items, totalItems, totalAmount, removeItem, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-24 flex flex-col items-center justify-center text-center">
        <div className="glass p-16 rounded-3xl max-w-md">
          <div className="text-6xl mb-8">🛒</div>
          <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-300 mb-8 text-lg">Add some delicious items to get started!</p>
          <Link to="/" className="btn w-full text-center py-4">Find Food</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container">
        <div className="glass p-8 mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Your Cart</h1>
          <p className="text-2xl text-gray-200">({totalItems} items)</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {items.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="glass p-8 sticky top-32 h-fit">
            <h3 className="text-2xl font-bold text-white mb-6">Order Summary</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-lg">
                <span>Subtotal:</span>
                <span>₹{totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg">
                <span>Delivery Fee:</span>
                <span>₹50</span>
              </div>
              <div className="h-px bg-white/30 my-4"></div>
              <div className="flex justify-between text-2xl font-bold text-white">
                <span>Total:</span>
                <span>₹{(totalAmount + 50).toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout" className="btn w-full text-center py-4 text-lg">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
