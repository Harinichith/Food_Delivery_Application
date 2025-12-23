const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <div className="glass p-6 rounded-2xl flex items-center space-x-6 mb-6">
      <img src={item.image} alt={item.name} className="w-20 h-20 rounded-xl object-cover" />
      <div className="flex-1">
        <h4 className="font-bold text-xl text-white mb-2">{item.name}</h4>
        <p className="text-gray-300 mb-4">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-400">₹{(item.price * item.quantity).toFixed(2)}</span>
          <div className="flex items-center space-x-3">
            <button 
              className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/30 text-xl"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span className="font-bold text-xl w-12 text-center">{item.quantity}</span>
            <button 
              className="w-12 h-12 glass rounded-xl flex items-center justify-center hover:bg-white/30 text-xl"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
            <button 
              className="text-red-400 hover:text-red-300 text-xl ml-4"
              onClick={() => onRemove(item.id)}
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
