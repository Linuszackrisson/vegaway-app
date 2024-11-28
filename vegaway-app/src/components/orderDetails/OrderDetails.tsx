// Rätta till importerna
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrders } from "../../api/ordersStaff"; 
import { Order, Item } from "../../api/utils/orderInterface"; 
import CartProductCard from "../CartProductCard/CartProductCard";
import "./OrderDetails.css"; 

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const result = await fetchOrders("false");
        const foundOrder = result.orders.find((order: Order) => order.orderId === orderId);

        if (foundOrder) {
          setOrderDetails(foundOrder);
        } else {
          setError("Order not found.");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Kunde inte hämta orderdetaljer. Försök igen senare.");
      } finally {
        setLoading(false);
      }
    };

    getOrderDetails();
  }, [orderId]);

  if (loading) {
    return <p>Laddar orderdetaljer...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!orderDetails) {
    return <p>Ingen information om produkter tillgänglig.</p>;
  }

  const itemCountMap: Record<string, number> = {};
  orderDetails.items.forEach(item => {
    itemCountMap[item.menuId] = (itemCountMap[item.menuId] || 0) + (item.quantity || 1);
  });

  return (
    <div className="order-details wrapper">
      <h2 className="order-details__title">{orderDetails.orderId.charAt(0).toUpperCase() + orderDetails.orderId.slice(1)}</h2>
      
      {Object.entries(itemCountMap).map(([menuId, count]) => {
        const item = orderDetails.items.find(item => item.menuId === menuId);
        return (
          <div key={menuId}>
            <CartProductCard 
              item={{ ...item, quantity: count } as Item & { quantity: number }} // Använd det totala antalet
            />
          </div>
        );
      })}
      
    </div>
  );
};

export default OrderDetails;