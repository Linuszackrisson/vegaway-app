// src/components/OrderHistory/OrderHistory.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Order } from "../../api/utils/orderInterface";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import { MenuItem } from "../../api/menuApi";
import "./orderHistory.css";
interface OrderHistoryProps {
  order: Order;
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ order }) => {
  const [isOpen, setIsOpen] = useState(false);

  const setOrder = useCurrentOrderStore((state) => state.setOrder);
  const navigate = useNavigate();

  // Map isConfirmed to status
  const status = order.isConfirmed === "true" ? "Confirmed" : "Active";
  const statusColor = status === "Active" ? "#FF7D7D" : "#01CFA2";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Function to set the order in the store and navigate
  const handleHeaderClick = () => {
    setOrder({
      orderId: order.orderId,
      customerEmail: order.customerEmail,
      createdAt: order.createdAt,
      isConfirmed: order.isConfirmed,
      items: order.items as MenuItem[], // Duct tape solution :D
      totalPrice: order.totalPrice,
    });

    // Navigate to /order-confirmation after setting the order
    navigate("/order-confirmation");
  };

  return (
    <div className="order-history">
      {/* Header */}
      <div className="order-history__header" onClick={handleHeaderClick}>
        <div className="order-history__header-left">
          <span className="order-history__order-id">
            Order ID: {order.orderId}
          </span>
        </div>
        <div className="order-history__header-right">
          <span
            className="order-history__status-indicator"
            style={{ backgroundColor: statusColor }}
          ></span>
          <span className="order-history__status">{status}</span>
        </div>
      </div>

      {/* Body */}
      <div className="order-history__body">
        <div className="order-history__body-left">
          <span className="order-history__total-price">
            Total: ${order.totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="order-history__body-right">
          <button
            className="order-history__toggle-button"
            onClick={toggleDropdown}
          >
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {/* Dropdown with Order Items */}
      {isOpen && (
        <div className="order-history__items">
          <ul className="order-history__items-list">
            {order.items.map((item, index) => (
              <li key={index} className="order-history__item">
                <div className="order-history__item-image-container">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="order-history__item-image"
                    />
                  )}
                </div>
                <div className="order-history__item-info">
                  <h3 className="order-history__item-title">{item.name}</h3>
                  <p className="order-history__item-price">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;

/* Författare: Jacob
 *
 * Skapat boilerplate och preppat inför funktionalitet
 */

/* Uppdatering: Isak
 *
 * Implementerar handle click för att sätta current order baserat på klickad order, samt navigering till order-confirmation som renderar content baserat på current order state.
 */
