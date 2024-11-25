// src/components/EditOrder/EditOrder.tsx
import React, { useEffect, useRef } from "react";
import "./EditOrder.css";
import { useCartStore } from "../../store/cartStore";
import CartProductCard from "../CartProductCard/CartProductCard";
import { MenuItem } from "../../api/menuApi";

interface EditOrderProps {
	onClose: () => void;
}

const EditOrder: React.FC<EditOrderProps> = ({ onClose }) => {
	const cartItems = useCartStore((state) => state.items);
	const uniqueCartItems = Array.from(
		new Map(cartItems.map((item) => [item.menuId, item])).values()
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
			<div className="edit-order__content" ref={contentRef}>
				<button className="edit-order__close-button" onClick={onClose}>
					Close
				</button>
				<h2 className="edit-order__title">Edit Your Order</h2>
				<div className="edit-order__items">
					{uniqueCartItems.map((item) => {
						const itemCount = cartItems.filter(
							(cartItem) => cartItem.menuId === item.menuId
						).length;
						return (
							<CartProductCard
								key={item.menuId}
								item={
									{ ...item, count: itemCount } as MenuItem & { count: number }
								}
							/>
						);
					})}
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
