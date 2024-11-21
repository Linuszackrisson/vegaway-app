// src/components/header/Header.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import LoginButton from "../loginButton/LoginButton";
import SliderMenu from "../sliderMenu/SliderMenu";
import "./Header.css";

interface DecodedToken {
	exp: number;
	[key: string]: any;
}

const Header: React.FC = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	// Check if the user is logged in when the component mounts
	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			try {
				const decodedToken: DecodedToken = jwtDecode(accessToken);
				const currentTime = Math.floor(Date.now() / 1000);

				if (decodedToken.exp > currentTime) {
					setIsLoggedIn(true);
				} else {
					localStorage.removeItem("access_token");
					setIsLoggedIn(false);
				}
			} catch (error) {
				console.error("Failed to decode token:", error);
				setIsLoggedIn(false);
			}
		} else {
			setIsLoggedIn(false);
		}
	}, []);

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
