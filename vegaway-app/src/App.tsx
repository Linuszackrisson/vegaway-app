// src/App.tsx
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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
    <>
      <LoginButton />
      <Router>
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
    </>
  );
}

export default App;

/**
 * Författare Linus
  App.tsx boilerplate med importer och routes setup.
  Uppdaterad
  av Jacob: Lagt till routing för ProductPage 
 */
