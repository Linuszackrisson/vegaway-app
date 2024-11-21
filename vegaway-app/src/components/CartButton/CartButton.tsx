// src/components/cartButton/CartButton.tsx
import { useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, CreditCard, ChevronRight } from "lucide-react";
import "./CartButton.css";

const CartButton: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const isCartPage = location.pathname === "/cart";

	const handleClick = () => {
		if (isCartPage) {
			// Handle complete order action
			// Navigate to checkout or handle order completion logic here
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
