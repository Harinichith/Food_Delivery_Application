import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => (
  <Link to={`/food/${food.id}`} className="glass p-6 text-center card-hover group">
    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden shadow-xl group-hover:scale-110">
      <img src={food.img} alt={food.name} className="w-full h-full object-cover" />
    </div>
    <h4 className="font-bold text-xl text-white mb-2">{food.name}</h4>
    <p className="text-2xl font-bold text-yellow-400">₹{food.price}</p>
  </Link>
);

export default FoodCard;
