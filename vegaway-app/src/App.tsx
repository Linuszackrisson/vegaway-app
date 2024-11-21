// src/App.tsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductPage from "./pages/productPage/ProductPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CartPage from "./pages/CartPage/CartPage";
import CallbackPage from "./pages/callbackPage/CallbackPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Header from "./components/header/Header";
import SliderMenu from "./components/sliderMenu/SliderMenu";
import { AuthProvider } from "./contexts/AuthContext";
import { MenuProvider } from "./contexts/MenuContext";
import "./App.css";

function App() {
	return (
		<AuthProvider>
			<MenuProvider>
				<Router>
					<Header />
					<SliderMenu />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/contact" element={<ContactPage />} />
						<Route path="/menu" element={<MenuPage />} />
						<Route path="/product/:id" element={<ProductPage />} />
						<Route path="/dashboard" element={<DashboardPage />} />
						<Route path="/cart" element={<CartPage />} />
						<Route path="/callback" element={<CallbackPage />} />
						<Route path="/profile" element={<ProfilePage />} />
					</Routes>
				</Router>
			</MenuProvider>
		</AuthProvider>
	);
}

export default App;
