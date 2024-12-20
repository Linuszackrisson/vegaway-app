// src/components/EditOrder/EditOrder.tsx
import { useEffect, useRef, useState } from "react";
import CartProductCard from "../cartProductCard/CartProductCard";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import { MenuItem } from "../../api/menuApi";
import { updateOrder } from "../../api/updateOrder";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import "./editOrder.css";
interface EditOrderProps {
  onClose: () => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ onClose }) => {
  // Update order handler
  const [errorMessage, setErrorMessage] = useState("");
  const { setMessage, setVisibility } = useFeedbackStore.getState();

  const handleUpdateOrder = async () => {
    try {
      await updateOrder();

      setMessage("Order updated successfully");
      setVisibility(true);
      onClose(); // Close the edit overlay when order has been updated
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Store the error message if an error occurs
        console.log(errorMessage);
        onClose();
      } else {
        setErrorMessage("An unexpected error occurred.");
        console.log(errorMessage);
        onClose();
      }
    }
  };

  // Get the current order from the store
  const order = useCurrentOrderStore((state) => state.order);

  // Ensure only unique items are used, based on menuId
  const uniqueOrderItems = Array.from(
    new Map(order?.items.map((item) => [item.menuId, item])).values()
  );

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setTimeout(() => {
        contentRef.current!.classList.add("open");
      }, 10);
    }
    return () => {
      if (contentRef.current) {
        contentRef.current!.classList.remove("open");
      }
    };
  }, []);

  return (
    <div className="edit-order">
      <div className="edit-order__overlay" onClick={onClose}></div>
      <div className="card edit-order__content wrapper px-1" ref={contentRef}>
        <div className="edit-order__header">
          <button
            className="button button--second edit-order__update-button"
            onClick={handleUpdateOrder}
          >
            <span className="button__text">Update</span>
          </button>
          <h3 className="edit-order__title">Edit Your Order</h3>
          <button
            className="button button--second edit-order__close-button"
            onClick={onClose}
          >
            <span className="button__text">Close</span>
          </button>
        </div>
        <div className="edit-order__items">
          {/* Conditionally render based on the existence of items */}
          {uniqueOrderItems.length > 0 ? (
            uniqueOrderItems.map((item) => {
              const itemCount = order?.items.filter(
                (orderItem) => orderItem.menuId === item.menuId
              ).length;
              return (
                <CartProductCard
                  key={item.menuId}
                  editOrder={true}
                  item={
                    { ...item, count: itemCount } as MenuItem & {
                      count: number;
                    }
                  }
                />
              );
            })
          ) : (
            <p>No items in your order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditOrder;

/* Författare: Jacob
 *
 * Component that opens a popup from bottom page for user to edit order.
 */

/* Uppdatering: Isak
 *
 * Använder feedback komponenten för att ge användaren feedback på vad som händer. Klick på update knappen stänger nu även edit vyn.
 */
