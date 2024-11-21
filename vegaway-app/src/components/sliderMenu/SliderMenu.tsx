// src/components/sliderMenu/SliderMenu.tsx
import React from "react";
import { Link } from "react-router-dom";

import "./SliderMenu.css";
import LoginButton from "../loginButton/LoginButton";

interface SliderMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const SliderMenu: React.FC<SliderMenuProps> = ({ isOpen, onClose }) => {
  const menuClass = isOpen ? "slider-menu open" : "slider-menu";

  return (
    <div className={menuClass}>
      <button className="close-button" onClick={onClose}>
        Close
      </button>
      <ul className="menu-items">
        <li>
          <Link to="/menu" onClick={onClose}>
            Menu
          </Link>
        </li>
        <li>
          <Link to="/orderHistory" onClick={onClose}>
            Order History
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={onClose}>
            Contact Us
          </Link>
        </li>
        <li>
          <LoginButton />
        </li>
      </ul>
    </div>
  );
};

export default SliderMenu;
