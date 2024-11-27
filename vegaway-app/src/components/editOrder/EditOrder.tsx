// src/components/EditOrder/EditOrder.tsx
import React, { useEffect, useRef, useState } from "react";
import "./EditOrder.css";
import CartProductCard from "../CartProductCard/CartProductCard";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import { MenuItem } from "../../api/menuApi";
import { updateOrder } from "../../api/updateOrder";

interface EditOrderProps {
  onClose: () => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ onClose }) => {
  // Update order handler
  const [errorMessage, setErrorMessage] = useState("");
  const handleUpdateOrder = async () => {
    try {
      const response = await updateOrder();
      console.log("Updated order response:", response);

      setErrorMessage("");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Store the error message if an error occurs
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  // Get the current order from the store
  const order = useCurrentOrderStore((state) => state.order);
  console.log("Logging order state:", order);

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
      {errorMessage !== "" && (
        <div className="edit-order__error-message">
          <button
            className="edit-order__error-message__close"
            onClick={onClose}
          >
            X
          </button>
          {errorMessage}
        </div>
      )}
      <div className="edit-order__overlay" onClick={onClose}></div>
      <div className="edit-order__content" ref={contentRef}>
        <button
          className="edit-order__update-button"
          onClick={handleUpdateOrder}
        >
          Update
        </button>
        <button className="edit-order__close-button" onClick={onClose}>
          Close
        </button>
        <h2 className="edit-order__title">Edit Your Order</h2>
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

/**
 * Författare: Jacob
 * Component that opens a popup from bottom page for user to edit order.
 */
