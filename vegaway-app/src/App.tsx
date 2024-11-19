// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductPage from "./pages/productPage/ProductPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import CartPage from "./pages/CartPage/CartPage";
import CallbackPage from "./pages/callbackPage/CallbackPage";
import LoginButton from "./components/loginButton/LoginButton";

function App() {
	return (
		<Router>
			<div>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/ContactPage" element={<ContactPage />} />
					<Route path="/menu" element={<MenuPage />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/dashboard" element={<DashboardPage />} />
					<Route path="/cart" element={<CartPage />} />
				</Routes>
			</div>
		</Router>
	);
}

export default App;

/**
 * Författare Linus
  App.tsx boilerplate med importer och routes setup.
  Uppdaterad
  av Jacob: Lagt till routing för ProductPage 
 */
