// src/components/cartButton/CartButton.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard, ChevronRight } from "lucide-react";
import "./CartButton.css";
import { createOrder } from "../../api/placeOrder";

const CartButton: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isCartPage = location.pathname === "/cart";

  const handleClick = async () => {
    if (isCartPage) {
      await createOrder();
      navigate("/checkout");
    } else {
      navigate("/cart");
    }
  };

  return (
    <button className="cart-button" onClick={handleClick}>
      <div className="cart-button-content">
        {isCartPage ? <CreditCard /> : <ShoppingCart />}
        <span>{isCartPage ? "Complete Order" : "See Your Cart"}</span>
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
