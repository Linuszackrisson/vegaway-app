// src/components/cartButton/CartButton.tsx
import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";
import { createOrder } from "../../api/placeOrder";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import { useCartStore } from "../../store/cartStore";
import "./cartButton.css";

const CartButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentOrder = useCurrentOrderStore((state) => state.order);
  const { items } = useCartStore((state) => state);
  const [isFlashing, setIsFlashing] = useState(false);
  const prevItemsLength = useRef(items.length);

  const hideCartButtonPaths = [
    "/dashboard",
    "/pending-orders",
    "/active-orders",
  ];

  const shouldHideCartButton = hideCartButtonPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  const isCartPage = location.pathname === "/cart";
  const isOrderConfirmationPage = location.pathname === "/order-confirmation";

  const handleClick = async () => {
    if (isCartPage) {
      await createOrder();
      navigate("/order-confirmation");
    } else if (isOrderConfirmationPage) {
      if (currentOrder?.isConfirmed === "true") {
        navigate("/menu");
      } else if (!currentOrder) {
        navigate("/order-history");
      } else {
        navigate("/order-confirmation?edit=true");
      }
    } else {
      navigate("/cart");
    }
  };

  useEffect(() => {
    // Only trigger the flash if the length of items has increased (item added)
    if (items.length > prevItemsLength.current) {
      setIsFlashing(true);

      // Reset the flash effect after a short duration
      const flashTimer = setTimeout(() => {
        setIsFlashing(false);
      }, 200);

      return () => clearTimeout(flashTimer); // Clean up the timer if the component is unmounted
    }

    // Update the previous items length
    prevItemsLength.current = items.length;
  }, [items.length]);

  if (shouldHideCartButton) {
    return null;
  }

  let buttonIcon;
  let buttonText;

  if (isCartPage) {
    buttonIcon = <Icon name="CreditCard" className="button__icon" />;
    buttonText = "Complete Order";
  } else if (isOrderConfirmationPage) {
    if (currentOrder === null) {
      buttonIcon = null;
      buttonText = "Go to order history";
    } else {
      buttonIcon =
        currentOrder.isConfirmed === "true" ? (
          <Icon name="ShoppingBag" className="button__icon" />
        ) : (
          <Icon name="Edit3" className="button__icon" />
        );
      buttonText =
        currentOrder.isConfirmed === "true"
          ? "Order Something More"
          : "Edit Your Order";
    }
  } else {
    buttonIcon = <Icon name="ShoppingCart" className="button__icon" />;
    buttonText = "My Cart";
  }

  return (
    <button
      className={`button button--first cart-button ${
        isFlashing ? "flashing" : ""
      }`}
      onClick={handleClick}
    >
      <div className="button__left">
        {buttonIcon}
        <span className="button__text">{buttonText}</span>
      </div>
      <Icon name="ChevronRight" className="button__icon button__right" />
    </button>
  );
};

export default CartButton;

/* Författare: Jacob
 *
 * CartButton component that changes based on the current page.
 * Updated to use Icon component and button classes for consistent styling.
 */

/* Uppdatering: Isak
 *
 * Added the createOrder function to click handler
 */

/* Uppdatering: Jacob
 *
 * Updated to show different buttons on different pages
 */

/* Uppdatering: Jacob
 *
 * Conditionally render null if staffpage
 */

/* Uppdatering: Isak
 *
 * Removed local state and use the current order zustand store state instead.
 * Cart button displays and acts correctly if order has been confirmed.
 */
