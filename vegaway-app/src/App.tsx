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
import ActiveOrders from "./pages/activeOrdersPage/activeOrdersPage";
import OrderDetails from "./components/orderDetails/OrderDetails";
import "./App.css";
import OrderHistoryPage from "./pages/orderHistoryPage/OrderHistoryPage";
import ResetCurrentOrder from "./utils/ResetCurrentOrder";
import ProtectedRoute from "./utils/ProtectedRoute";
import Feedback from "./components/feedback/Feedback";

function App() {
  return (
    <Router>
      <Header />
      <ResetCurrentOrder>
        <Routes>
          {/* CUSTOMER ROUTES */}
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
          <Route path="/callback" element={<CallbackPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/order-history" element={<OrderHistoryPage />} />

          {/* STAFF ROUTES */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-orders"
            element={
              <ProtectedRoute>
                <PendingOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pending-orders/:orderId"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="/active-orders"
            element={
              <ProtectedRoute>
                <ActiveOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ResetCurrentOrder>
      <CartButton />

      <Feedback /* Component that conditionally displays feedback message */ />
    </Router>
  );
}

export default App;

/* Författare: Linus
 * Denna filen hanterar routningen av sidan och innehåller alla routes som finns i våran hemsida.
 * Jacob / Isak lagt till övriga routes.
 */

/* 
Uppdatering: Isak
Wrappar routes i en komponent som återställer order state i useCurrentOrderStore då användaren inte befinner sig på route /order-confirmation
*/

/*
Uppdatering: Isak

Skyddar staff routes från användare som inte är staff med hjälp av ProtectedRoute komponent.
Extra validering finns även i backend som backup så ingen request i dessa routes går att göra om man inte är staff.
*/

/* 
Uppdatering: Isak

Renderar feedback komponent här för enkel åtkomst. Komponenten sköter logiken för om den ska visas själv
*/
