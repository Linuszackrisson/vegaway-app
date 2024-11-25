// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductPage from "./pages/productPage/ProductPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CartPage from "./pages/CartPage/CartPage";
import CartButton from "./components/CartButton/CartButton";
import OrderConfirmationPage from "./pages/orderConfirmationPage/OrderConfirmationPage";
import CallbackPage from "./pages/callbackPage/CallbackPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import RefreshStatusBtn from "./api/utils/testing/RefreshStatusBtn"
import Header from "./components/header/Header";
import "./App.css";

function App() {
  return (
		<Router>
			<Header />
			<RefreshStatusBtn />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/menu" element={<MenuPage />} />
				<Route path="/product/:id" element={<ProductPage />} />
				<Route path="/dashboard" element={<DashboardPage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/order-confirmation" element={<OrderConfirmationPage />} />
				<Route path="/callback" element={<CallbackPage />} />
				<Route path="/profile" element={<ProfilePage />} />
			</Routes>
			<CartButton />
		</Router>
	);
}

export default App;
