// src/components/header/Header.tsx
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";
import LoginButton from "../loginButton/LoginButton";
import SliderMenu from "../sliderMenu/SliderMenu";
import useLoggedInStore from "../../store/useLoggedInStore";
import Logo from "../../assets/logo.svg";
import "./header.css";

const Header: React.FC = () => {
  const { updateLoginState } = useLoggedInStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isOrderConfirmationPage = location.pathname === "/order-confirmation";

  // Check the login state when the component mounts
  useEffect(() => {
    updateLoginState();
  }, [updateLoginState]);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
		<header className="header">
			<div className="header__left">
				{isHomePage || isOrderConfirmationPage ? (
					<Link to="/">
						<img src={Logo} alt="Logo" className="logo" />
					</Link>
				) : (
					<button className="button button--fourth back-button" onClick={handleBack}>
						<Icon name="ChevronLeft" className="icon" />
					</button>
				)}
			</div>
			<div className="header__right">
				<button className="button button--fourth menu-button" onClick={toggleMenu}>
					<Icon name="Equal" className="icon" />
				</button>
				<div className="header__profile">
					<LoginButton variant="icon-only" />
				</div>
			</div>
			<SliderMenu isOpen={isMenuOpen} onClose={toggleMenu} />
		</header>
	);
};

export default Header;

/* Författare: Jacob
 *
 * Header-komponent som renderar knappar och slider-menu
 */

/* Uppdatering: Isak
 *
 * Använder nu Zustand store för att göra filen enklare.
 */

/* Uppdatering: Isak
 *
 * Menyn kan nu öppnas och stängas med menyknappen i headern.
 */

/* Uppdatering: Jacob
 *
 * - Använde Icon-komponenten för ikoner.
 * - Implementerade signin/signout-ikon tillsammans med texten i headern via LoginButton.
 */

/* Uppdatering: Jacob
 *
 * - Logo link på OrderConfirmationPage ist för back button.
 */
