// src/components/sliderMenu/SliderMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Home, UtensilsCrossed, History, MessageCircle, ChevronLeft } from "lucide-react";
import LoginButton from "../loginButton/LoginButton";
import useLoggedInStore from "../../store/useLoggedInStore";
import "./SliderMenu.css";

interface SliderMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

const SliderMenu: React.FC<SliderMenuProps> = ({ isOpen, onClose }) => {
	const { isLoggedIn } = useLoggedInStore();
	const menuClass = isOpen ? "slider-menu open" : "slider-menu";

	return (
		<div className={menuClass}>
			<div className="menu-header">
				<button className="back-button" onClick={onClose}>
					<ChevronLeft />
				</button>
			</div>
			<div className="menu-content">
				<ul className="menu-nav">
					<li>
						<Link to="/" onClick={onClose}>
							<Home className="icon" strokeWidth={1.5} size={22} />
							<span>Home</span>
						</Link>
					</li>
					<li>
						<Link to="/menu" onClick={onClose}>
							<UtensilsCrossed className="icon" strokeWidth={1.5} size={22} />
							<span>Menu</span>
						</Link>
					</li>
					{isLoggedIn && (
						<li>
							<Link to="/orderHistory" onClick={onClose}>
								<History className="icon" strokeWidth={1.5} size={22} />
								<span>Order History</span>
							</Link>
						</li>
					)}
					<li>
						<Link to="/contact" onClick={onClose}>
							<MessageCircle className="icon" strokeWidth={1.5} size={22} />
							<span>Contact Us</span>
						</Link>
					</li>
				</ul>
			</div>
			<div className="slider-menu__login button__second">
				<LoginButton />
			</div>
			<img
				src="/src/assets/slider-vector.svg"
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
*/
