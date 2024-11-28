import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ContactPage from "./pages/contactPage/ContactPage";
import MenuPage from "./pages/MenuPage/MenuPage";
import ProductPage from "./pages/productPage/ProductPage";
import CartPage from "./pages/CartPage/CartPage";
import CartButton from "./components/CartButton/CartButton";
import OrderConfirmationPage from "./pages/orderConfirmationPage/OrderConfirmationPage";
import CallbackPage from "./pages/callbackPage/CallbackPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import Header from "./components/header/Header";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import PendingOrders from "./pages/pendingOrdersPage/PendingOrders";
import OrderDetails from "./components/orderDetails/OrderDetails";
import "./App.css";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage";

function App() {
  return (

    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pending-orders" element={<PendingOrders />} />
       	<Route path="/pending-orders/:orderId" element={<OrderDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/order-history" element={<OrderHistoryPage />} />
      </Routes>
      <CartButton />
    </Router>
  );

}

export default App;

/* Författare: Linus
 * Denna filen hanterar routningen av sidan och innehåller alla routes som finns i våran hemsida.
 * Jacob / Isak lagt till övriga routes.
 */
