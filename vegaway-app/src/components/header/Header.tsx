// src/components/header/Header.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import LoginButton from "../loginButton/LoginButton";
import SliderMenu from "../sliderMenu/SliderMenu";
import useLoggedInStore from "../../store/useLoggedInStore";
import "./Header.css";

const Header: React.FC = () => {
  const { isLoggedIn, updateLoginState } = useLoggedInStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Check the login state when the component mounts
  useEffect(() => {
    updateLoginState();
  }, [updateLoginState]);

  const openMenu = () => {
    setIsMenuOpen(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <button className="menu-button" onClick={openMenu}>
        <Menu />
      </button>
      <Link to="/" className="logo">
        Vegaway
      </Link>
      <div className="header-icons">
        {isLoggedIn ? (
          <Link to="/profile">
            <User />
          </Link>
        ) : (
          <LoginButton />
        )}
      </div>
      <SliderMenu isOpen={isMenuOpen} onClose={closeMenu} />
    </header>
  );
};

export default Header;

/* 
Författare: Jacob

Header komponent som renderar knappar och slider menu

Uppdatering: Isak
Använder nu zustand store för att göra den fil simplare.

*/
