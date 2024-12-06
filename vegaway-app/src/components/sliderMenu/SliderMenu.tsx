// src/components/sliderMenu/SliderMenu.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../icon/Icon";
import LoginButton from "../loginButton/LoginButton";
import useLoggedInStore from "../../store/useLoggedInStore";
import Slidervector from "../../assets/slider-vector.svg";
import { jwtDecode } from "jwt-decode";
import { DecodedTokenGroups } from "../../utils/ProtectedRoute";
import "./sliderMenu.css";

interface SliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SliderMenu: React.FC<SliderMenuProps> = ({ isOpen, onClose }) => {
  const { isLoggedIn } = useLoggedInStore();
  const menuClass = isOpen ? "slider-menu open" : "slider-menu";
  // Define the state and effect for checking if the user is in the "Staff" group
  const [isStaff, setIsStaff] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch the id_token from localStorage
    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      try {
        // Decode the id_token to get the user's groups
        const decoded: DecodedTokenGroups = jwtDecode(idToken);
        const userGroups: string[] = decoded["cognito:groups"] || [];

        // Check if the user is in the "Staff" group
        setIsStaff(userGroups.includes("Staff"));
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsStaff(false); // Default to false if token decoding fails
      }
    } else {
      setIsStaff(false); // If no token is found, assume user is not in the "Staff" group
    }
  }, []);

  return (
    <div className={menuClass}>
      <div className="menu-header">
        <button className="button button--fourth back-button" onClick={onClose}>
          <Icon name="ChevronLeft" className="icon" />
        </button>
      </div>
      <div className="menu-content">
        <ul className="menu-nav">
          {/* Conditionally render the Dashboard option when staff is logged in */}
          {isStaff && (
            <li>
              <Link
                to="/dashboard"
                onClick={onClose}
                className="button button--menu"
              >
                <Icon name="LayoutDashboard" className="button__icon" />
                <span className="button__text">Dashboard</span>
              </Link>
            </li>
          )}

          <li>
            <Link to="/" onClick={onClose} className="button button--menu">
              <Icon name="Home" className="button__icon" />
              <span className="button__text">Home</span>
            </Link>
          </li>
          <li>
            <Link to="/menu" onClick={onClose} className="button button--menu">
              <Icon name="UtensilsCrossed" className="button__icon" />
              <span className="button__text">Menu</span>
            </Link>
          </li>
          {isLoggedIn && (
            <li>
              <Link
                to="/order-history"
                onClick={onClose}
                className="button button--menu"
              >
                <Icon name="History" className="button__icon" />
                <span className="button__text">Order History</span>
              </Link>
            </li>
          )}
          <li>
            <Link
              to="/contact"
              onClick={onClose}
              className="button button--menu"
            >
              <Icon name="MessageCircle" className="button__icon" />
              <span className="button__text">Contact Us</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="slider-menu__login">
        <LoginButton variant="full" />
      </div>
      <img
        src={Slidervector}
        alt="Vegaway Illustration"
        className="slider-menu__graf"
      />
    </div>
  );
};

export default SliderMenu;

/* 
Författare: Jacob

Komponent för slider-menyn med navigeringsalternativ

Uppdatering: Isak
Använder LoginButton-komponenten och uppdaterar close-knappen till en left chevron.
Uppdaterad:
- Använder Icon-komponenten för ikoner.
- Justerade LoginButton för att använda rätt knappklass.
*/
