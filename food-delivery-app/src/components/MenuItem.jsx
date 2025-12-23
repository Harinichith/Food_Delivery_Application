const MenuItem = ({ item, onAddToCart, cartItems }) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === item.id);
  
  return (
    <div className="glass p-6 rounded-2xl flex items-center space-x-6 hover:shadow-2xl transition-all duration-300">
      <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
      <div className="flex-1">
        <h4 className="font-bold text-xl text-white mb-2">{item.name}</h4>
        <p className="text-gray-300 mb-3">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-yellow-400">₹{item.price}</span>
          {existingItem ? (
            <div className="flex items-center space-x-2">
              <button 
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl hover:bg-white/30"
                onClick={() => onAddToCart({...item, quantity: existingItem.quantity - 1})}
              >
                -
              </button>
              <span className="font-bold text-xl px-4">{existingItem.quantity}</span>
              <button 
                className="w-10 h-10 glass rounded-full flex items-center justify-center text-xl hover:bg-white/30"
                onClick={() => onAddToCart(item)}
              >
                +
              </button>
            </div>
          ) : (
            <button className="btn text-sm px-6 py-2" onClick={() => onAddToCart(item)}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItem;
