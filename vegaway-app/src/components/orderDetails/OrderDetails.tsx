// Rätta till importerna
import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Order } from "../../api/utils/orderInterface";
import CartProductCard from "../CartProductCard/CartProductCard";
import "./OrderDetails.css";

const OrderDetails: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const foundOrder = location.state?.order;
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

  // Loop through the items and count the quantities
  orderDetails.items.forEach((item) => {
    const menuId = item.menuId; // Access menuId directly from each item

    // Add to the item count for the specific menuId
    itemCountMap[menuId] = (itemCountMap[menuId] || 0) + (item.quantity || 1); // Ensure we handle undefined quantities
  });

  return (
    <div className="order-details wrapper">
      <h2 className="order-details__title">
        {orderDetails.orderId.charAt(0).toUpperCase() +
          orderDetails.orderId.slice(1)}
      </h2>

      {Object.entries(itemCountMap).map(([menuId, count]) => {
        // Find the first matching item for this menuId
        const item = orderDetails.items.find((item) => item.menuId === menuId);

        if (item) {
          // Spread the item and update its quantity
          const updatedItem = { ...item, quantity: count };

          return (
            <div key={menuId}>
              <CartProductCard item={updatedItem} isStaffOrderDetails={true} />
            </div>
          );
        }

        return null; // In case no item was found for this menuId
      })}
    </div>
  );
};

export default OrderDetails;

/* Författare: Linus
 * Denna filen hanterar orderdetaljer och innehåller funktioner för att hantera ordrar.
 */
