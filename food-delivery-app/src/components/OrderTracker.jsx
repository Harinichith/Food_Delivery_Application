const OrderTracker = ({ order }) => (
  <div className="order-tracker">
    <div className="progress-bar">
      <div 
        className="progress-fill" 
        style={{ width: `${order.progress}%` }}
      ></div>
    </div>
    <div className="order-info">
      <div className="order-restaurant">{order.restaurant}</div>
      <div className="order-details">
        {order.items} items • {order.eta}
      </div>
    </div>
  </div>
);

export default OrderTracker;
