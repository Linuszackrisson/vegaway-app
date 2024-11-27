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
import { useState } from "react";

const CartButton: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [orderConfirmed] = useState(false);

	const hideCartButtonPaths = ["/dashboard", "/staff-sida2-etc"];

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
			if (orderConfirmed) {
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
		buttonIcon = orderConfirmed ? <ShoppingBag /> : <Edit3 />;
		buttonText = orderConfirmed ? "Order Something More" : "Edit Your Order";
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
