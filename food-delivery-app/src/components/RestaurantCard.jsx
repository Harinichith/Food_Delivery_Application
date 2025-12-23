import { Link } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => (
  <Link to={`/restaurant/${restaurant.id}`} className="glass p-8 text-center card-hover group">
    <div className="w-32 h-32 mx-auto mb-6 rounded-3xl overflow-hidden shadow-2xl group-hover:scale-110 transition-all duration-500">
      <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-yellow-300">{restaurant.name}</h3>
    <div className="flex items-center justify-center mb-4">
      <span className="text-yellow-400 text-2xl">⭐</span>
      <span className="ml-2 text-xl font-bold text-white">{restaurant.rating}</span>
    </div>
    <p className="text-gray-200 mb-4">{restaurant.cuisine}</p>
    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300">
      <span>⚡ {restaurant.time}</span>
      <span>₹{restaurant.fee}</span>
    </div>
  </Link>
);

export default RestaurantCard;
