// Rätta till importerna
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useParams, useLocation } from "react-router-dom";
import { Order } from "../../api/utils/orderInterface";
import CartProductCard from "../cartProductCard/CartProductCard";
import { updateOrder } from "../../api/updateOrderStaff";
import { MenuItem } from "../../api/menuApi";
import "./orderDetails.css";

interface OrderDetailsProps {
  isActiveOrder: boolean; // Optional prop
}

const OrderDetails: React.FC<OrderDetailsProps> = ({ isActiveOrder }) => {
  const { orderId } = useParams<{ orderId: string }>();
  const location = useLocation();
  const [orderDetails, setOrderDetails] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const orderDetailsRef = useRef(orderDetails);
  const navigate = useNavigate();

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

  useEffect(() => {
    orderDetailsRef.current = orderDetails; // Sync the ref with the state value
  }, [orderDetails]);

  useEffect(() => {
    console.log("Updated orderDetails (ref):", orderDetailsRef.current);
  }, [orderDetailsRef.current]); // This will log the latest value immediately after the update

  const handleUpdateOrder = async () => {
    if (!orderDetails) return;

    const { orderId, items, totalPrice } = orderDetails;

    try {
      const response = await updateOrder(
        orderId,
        items as MenuItem[],
        totalPrice
      );
      console.log("Update response:", response);
      navigate("/pending-orders");
    } catch (err) {
      console.error("Failed to update order:", err);
    }
  };

  const updateItemInOrder = (menuId: string, updatedQuantity: number) => {
    if (!orderDetails) return;

    // Find the item template (the first item matching the menuId)
    const itemTemplate = orderDetails.items.find(
      (item) => item.menuId === menuId
    );

    if (!itemTemplate) return;

    // Create a new array with the desired quantity
    const updatedItems = [
      ...orderDetails.items.filter((item) => item.menuId !== menuId), // Keep other items unchanged
      ...Array.from({ length: updatedQuantity }, () => ({
        ...itemTemplate, // Copy the item template (menuId, price, etc.)
      })),
    ];

    // Recalculate total price whenever the items are updated
    const updatedTotalPrice = calculateTotalPrice(updatedItems as MenuItem[]);

    // This triggers a re-render and updates the state correctly
    setOrderDetails((prev) => {
      // Ensure you are creating a new object for the state update
      return prev
        ? { ...prev, items: updatedItems, totalPrice: updatedTotalPrice }
        : null;
    });
  };

  // Function to calculate the total price based on the items' prices only
  const calculateTotalPrice = (items: MenuItem[]) => {
    return items.reduce((total, item) => total + item.price, 0);
  };

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
              <CartProductCard
                item={updatedItem}
                isActiveOrder={isActiveOrder}
                isStaffOrderDetails={true}
                onUpdateItem={updateItemInOrder}
              />
            </div>
          );
        }

        return null; // In case no item was found for this menuId
      })}
      <button
        className="order-details__update-button"
        onClick={handleUpdateOrder}
      >
        Update Order
      </button>
    </div>
  );
};

export default OrderDetails;

/* Författare: Linus
 * Denna filen hanterar orderdetaljer och innehåller funktioner för att hantera ordrar.
 */

/* 
Uppdatering: Isak

Lagt till knapp som gör ett api anrop med uppdaterad order.
Implementerat funktionalitet för att låta CartProductCard uppdatera orderDetails.
*/
