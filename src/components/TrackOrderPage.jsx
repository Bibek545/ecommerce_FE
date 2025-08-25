import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getOrderByTrackingId } from "../helpers/axiosHelpers.js";

const TrackOrderPage = () => {
  const { trackingId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const loadOrder = async () => {
    const res = await getOrderByTrackingId(trackingId);
    console.log("Tracking API response:", res); //  Add this line

    if (res.status === "success") {
      setOrder(res);
    }
    setLoading(false);
  };

  loadOrder();
}, [trackingId]);


  if (loading) return <p>Loading...</p>;
  if (!order) return <p>Order not found.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "1rem" }}>
      <h2>Tracking Order #{order.orderId}</h2>
      <p>Status: <strong>{order.status}</strong></p>
      <p>Total Amount: ${order.totalAmount}</p>
      <p>Placed on: {new Date(order.placedAt).toLocaleString()}</p>

{order?.statusHistory?.length ? (
  <div>
    <h4>Status History</h4>
    <ul>
      {order.statusHistory.map((entry, i) => (
        <li key={i}>
          <strong>{entry.status}</strong> — {new Date(entry.updatedAt).toLocaleString()}
        </li>
      ))}
    </ul>
  </div>
) : (
  <p>No tracking updates yet.</p>
)}
    </div>
  );
};

export default TrackOrderPage;
