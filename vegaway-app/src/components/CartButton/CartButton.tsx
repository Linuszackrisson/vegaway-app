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
	const currentOrder = useCurrentOrderStore(state => state.order);

	const hideCartButtonPaths = ['/dashboard', '/pending-orders'];

	const shouldHideCartButton = hideCartButtonPaths.some(path => location.pathname.startsWith(path));

	if (shouldHideCartButton) {
		return null;
	}

	const isCartPage = location.pathname === '/cart';
	const isOrderConfirmationPage = location.pathname === '/order-confirmation';

	const handleClick = async () => {
		if (isCartPage) {
			await createOrder();
			navigate('/order-confirmation');
		} else if (isOrderConfirmationPage) {
			if (currentOrder?.isConfirmed === 'true') {
				navigate('/menu');
			} else if (!currentOrder) {
				navigate('/order-history');
			} else {
				navigate('/order-confirmation?edit=true');
			}
		} else {
			navigate('/cart');
		}
	};

	let buttonIcon;
	let buttonText;

	if (isCartPage) {
    buttonIcon = <CreditCard className="button__icon" strokeWidth={1.5} />;
		buttonText = 'Complete Order';
	} else if (isOrderConfirmationPage) {
		if (currentOrder === null) {
			// If the currentOrder is null, show "Go to order history" and no icon
			buttonIcon = null; // You can also set this to "" if preferred
			buttonText = 'Go to order history';
		} else {
			// Otherwise, show the usual order confirmation buttons
			buttonIcon =
				currentOrder.isConfirmed === 'true' ? (
					<ShoppingBag className="button__icon" strokeWidth={1.5} />
				) : (
					<Edit3 className="button__icon" strokeWidth={1.5} />
				);
			buttonText = currentOrder.isConfirmed === 'true' ? 'Order Something More' : 'Edit Your Order';
		}
	} else {
    buttonIcon = <ShoppingCart className="button__icon" strokeWidth={1.5} />;
		buttonText = 'See Your Cart';
	}

	return (
		<button className="button button--first cart-button" onClick={handleClick}>
			{buttonIcon}
			<span className="button__text">{buttonText}</span>
			<ChevronRight className="button__icon" />
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
