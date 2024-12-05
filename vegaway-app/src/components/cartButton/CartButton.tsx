// src/components/cartButton/CartButton.tsx
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";
import { createOrder } from "../../api/placeOrder";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import "./cartButton.css";

const CartButton: React.FC = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const currentOrder = useCurrentOrderStore(state => state.order);

	const hideCartButtonPaths = ["/dashboard", "/pending-orders", "/active-orders"];

	const shouldHideCartButton = hideCartButtonPaths.some(path => location.pathname.startsWith(path));

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
			} else if (!currentOrder) {
				navigate("/order-history");
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
			buttonText = currentOrder.isConfirmed === "true" ? "Order Something More" : "Edit Your Order";
		}
	} else {
		buttonIcon = <Icon name="ShoppingCart" className="button__icon" />;
		buttonText = "My Cart";
	}

	return (
		<button className="button button--first cart-button" onClick={handleClick}>
			<div className="button__left">
				{buttonIcon}
				<span className="button__text">{buttonText}</span>
			</div>
			<Icon name="ChevronRight" className="button__icon button__right" />
		</button>
	);
};

export default CartButton;

/**
Author: Jacob
/
CartButton component that changes based on the current page.
Updated to use Icon component and button classes for consistent styling.
Updated: Isak
Added the createOrder function to click handler
/
Updated: Jacob
Uppdated to show different buttons on different pages
/
Updated: Jacob
Conditionally render null if staffpage
/
Updated: Isak
Removed local state and use the current order zustand store state instead.
Cart button displayes and acts correctly if order has been confirmed.
 */
