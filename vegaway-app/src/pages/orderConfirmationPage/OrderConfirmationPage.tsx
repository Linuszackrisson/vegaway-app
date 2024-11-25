// src/pages/OrderConfirmationPage/OrderConfirmationPage.tsx
import React, { useState, useEffect } from "react";
import "./OrderConfirmationPage.css";
import { RefreshCw } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { refreshStatus } from "../../api/refreshStatus";
import EditOrder from "../../components/editOrder/EditOrder"; 
import Underline_06 from "../../assets/Underline_06.svg";

const OrderConfirmationPage: React.FC = () => {
	const [orderConfirmed, setOrderConfirmed] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [showEditOrder, setShowEditOrder] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const orderId = localStorage.getItem("current_order_id");

	const refreshOrderStatus = async () => {
		if (!orderId) return;
		setIsLoading(true);
		try {
			const response = await refreshStatus(orderId);
			setOrderConfirmed(response.isConfirmed === "true");
		} catch (error) {
			console.error("Error refreshing order status:", error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		const params = new URLSearchParams(location.search);
		if (params.get("edit") === "true") {
			setShowEditOrder(true);
		}
	}, [location.search]);

	const handleRefreshClick = () => {
		refreshOrderStatus();
	};

	const handleOverlayClose = () => {
		setShowEditOrder(false);
		navigate("/order-confirmation", { replace: true });
	};

	return (
		<div className="order-confirmation wrapper">
			<h1 className="order-confirmation__title">Order Confirmation</h1>
			<img
				src={Underline_06}
				alt="Underline"
				className="order-confirmation__image"
			/>
			<p className="order-confirmation__message">
				{orderConfirmed
					? "Your order has been confirmed!"
					: "Your order is awaiting confirmation from our staff."}
			</p>
			<button
				className="order-confirmation__refresh-button button__second"
				onClick={handleRefreshClick}
				disabled={isLoading}
			>
				<RefreshCw />
				<span>Refresh Status</span>
			</button>
			{showEditOrder && <EditOrder onClose={handleOverlayClose} />}
		</div>
	);
};

export default OrderConfirmationPage;

/**
 * Författare: [Ditt namn]
 * OrderConfirmationPage-komponent som låter användaren uppdatera orderstatus och redigera sin order.
 */
