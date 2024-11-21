// src/App.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductPage from "./pages/productPage/ProductPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CartPage from "./pages/CartPage/CartPage";
import CallbackPage from "./pages/callbackPage/CallbackPage";
import Header from "./components/header/Header";
import SliderMenu from "./components/sliderMenu/SliderMenu";
import { getUserInfo } from "./api/utils/auth";
import "./App.css";

function App() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [userName, setUserName] = useState("User");

	useEffect(() => {
		// Check authentication status on app load
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			setAuthenticated(true);
			// Fetch user info using your auth utility
			const userInfo = getUserInfo();
			if (userInfo && userInfo.email) {
				setUserName(userInfo.email.split("@")[0]); // Use part of email as username
			}
		}
	}, []);

	const handleMenuClick = () => {
		setIsMenuOpen(true);
	};

	const handleMenuClose = () => {
		setIsMenuOpen(false);
	};

	return (
		<Router>
			<Header
				onMenuClick={handleMenuClick}
				isAuthenticated={isAuthenticated}
				userName={userName}
			/>
			<SliderMenu
				isOpen={isMenuOpen}
				onClose={handleMenuClose}
				isAuthenticated={isAuthenticated}
				userName={userName}
			/>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/menu" element={<MenuPage />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/callback" element={<CallbackPage />} />
			</Routes>
		</Router>
	);
}

export default App;
