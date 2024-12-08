// src/pages/OrderConfirmationPage/OrderConfirmationPage.tsx
import { useState, useEffect } from "react";
import Icon from "../../components/icon/Icon";
import { useNavigate, useLocation } from "react-router-dom";
import { refreshStatus } from "../../api/refreshStatus";
import EditOrder from "../../components/editOrder/EditOrder";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import Star from "../../assets/star.svg";
import "./orderConfirmationPage.css";

const OrderConfirmationPage: React.FC = () => {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditOrder, setShowEditOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const updateOrderField = useCurrentOrderStore(
    (state) => state.updateOrderField
  );
  const currentOrder = useCurrentOrderStore((state) => state.order);
  const { setMessage, setVisibility } = useFeedbackStore.getState();

  useEffect(() => {
    if (currentOrder?.isConfirmed === "true") {
      setOrderConfirmed(true);
    }
  }, [currentOrder?.isConfirmed]);

  const orderId = currentOrder?.orderId;

  const refreshOrderStatus = async () => {
    if (!orderId) return;
    setIsLoading(true);
    try {
      const response = await refreshStatus(orderId);

      if (response.isConfirmed === "true") {
        updateOrderField("isConfirmed", "true");
      } else {
        // Set the feedback message and make the overlay visible
        setMessage("Still waiting... :D");
        setVisibility(true);
      }
    } catch (error) {
      console.error("Error refreshing order status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("edit") === "true") {
      setShowEditOrder(true);
    }
  }, [location.search]);

  const handleRefreshClick = () => {
    refreshOrderStatus();
  };

  const handleOverlayClose = () => {
    setShowEditOrder(false);
    navigate("/order-confirmation", { replace: true });
  };

  return (
    <div className="order-confirmation wrapper px-1">
      <img
        src={Star}
        className="star-illustration"
        alt="Vegaway star illustration"
      />
      <section className="order-confirmation__content">
        {currentOrder ? (
          <>
            <h1 className="order-confirmation__message order-confirmation__message-1">
              Thank you for your order
            </h1>
            <h2 className="order-confirmation__message order-confirmation__message-2">
              {orderConfirmed
                ? "Your order has been confirmed!"
                : "Waiting for confirmation ..."}
            </h2>
          </>
        ) : (
          <h2 className="order-confirmation__message button--second">
            Please visit your order history to select an order
          </h2>
        )}
        {currentOrder?.isConfirmed === "false" && (
          <button
            className="button button--first order-confirmation__refresh"
            onClick={handleRefreshClick}
            disabled={isLoading}
          >
            <Icon name="RefreshCw" className="button__icon" />
            <span className="button__text">Refresh Status</span>
            <Icon name="ChevronRight" className="button__icon" />
          </button>
        )}
        {showEditOrder && <EditOrder onClose={handleOverlayClose} />}
      </section>
    </div>
  );
};

export default OrderConfirmationPage;

/* Författare: Jacob
 *
 * OrderConfirmationPage-komponent som låter användaren uppdatera orderstatus och redigera sin order.
 */

/* Uppdatering: Isak
 *
 * Renderar ett vänligt meddelande om kund försöker nå denna sida då order state är null
 */
