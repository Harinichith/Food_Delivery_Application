const DeliveryStatus = () => (
  <div className="delivery-status">
    <div className="status-item preparing">🧑‍🍳 Preparing</div>
    <div className="status-arrow">→</div>
    <div className="status-item out">🚗 Out for Delivery</div>
    <div className="status-arrow">→</div>
    <div className="status-item delivered">✅ Delivered</div>
  </div>
);

export default DeliveryStatus;
