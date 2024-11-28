// src/components/cartButton/CartButton.tsx
import { useLocation, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  CreditCard,
  ChevronRight,
  Edit3,
  ShoppingBag,
} from "lucide-react";
import "./CartButton.css";
import { createOrder } from "../../api/placeOrder";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";

const CartButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentOrder = useCurrentOrderStore((state) => state.order);

  const hideCartButtonPaths = ["/dashboard", "/pending-orders"];

  const shouldHideCartButton = hideCartButtonPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  if (shouldHideCartButton) {
    return null;
  }

  const isCartPage = location.pathname === "/cart";
  const isOrderConfirmationPage = location.pathname === "/order-confirmation";

  const handleClick = async () => {
    if (isCartPage) {
      await createOrder();
      navigate("/order-confirmation");
    } else if (isOrderConfirmationPage) {
      if (currentOrder?.isConfirmed === "true") {
        navigate("/menu");
      } else {
        navigate("/order-confirmation?edit=true");
      }
    } else {
      navigate("/cart");
    }
  };

  let buttonIcon;
  let buttonText;

  if (isCartPage) {
    buttonIcon = <CreditCard />;
    buttonText = "Complete Order";
  } else if (isOrderConfirmationPage) {
    buttonIcon =
      currentOrder?.isConfirmed === "true" ? <ShoppingBag /> : <Edit3 />;
    buttonText =
      currentOrder?.isConfirmed === "true"
        ? "Order Something More"
        : "Edit Your Order";
  } else {
    buttonIcon = <ShoppingCart />;
    buttonText = "See Your Cart";
  }

  return (
    <button className="cart-button" onClick={handleClick}>
      <div className="cart-button-content">
        {buttonIcon}
        <span>{buttonText}</span>
        <ChevronRight />
      </div>
    </button>
  );
};

export default CartButton;

/**
 * Author: Jacob
 * CartButton component that changes based on the current page.
 */

/* 
Updated: Isak
Added the createOrder function to click handler
*/
/* 
Updated: Jacob
Uppdated to show different buttons on different pages
*/
/* 
Updated: Jacob
Conditionally render null if staffpage
*/

/* 
Updated: Isak

Removed local state and use the current order zustand store state instead.
Cart button displayes and acts correctly if order has been confirmed.
*/
