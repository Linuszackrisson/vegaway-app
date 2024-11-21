// src/components/sliderMenu/SliderMenu.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./SliderMenu.css";

interface SliderMenuProps {
	isOpen: boolean;
	onClose: () => void;
}

interface DecodedToken {
	exp: number;
}

const SliderMenu: React.FC<SliderMenuProps> = ({ isOpen, onClose }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	// Kolla om användaren är inloggad när komponenten mountas
	useEffect(() => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			try {
				const decodedToken = jwtDecode<DecodedToken>(accessToken);
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

	const menuClass = isOpen ? "slider-menu open" : "slider-menu";

	const handleLogin = () => {
		const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
		const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
		const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;
		const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
		window.location.href = signInUrl;
	};

	const handleLogout = () => {
		const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
		const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
		const logoutRedirectUri: string = import.meta.env.VITE_APP_URL;
		const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

		// Rensa localStorage
		localStorage.removeItem("access_token");
		localStorage.removeItem("id_token");
		setIsLoggedIn(false);

		// Omdirigera till Cognitos logout-endpoint
		window.location.href = logoutUrl;
	};

	return (
		<div className={menuClass}>
			<button className="close-button" onClick={onClose}>
				Close
			</button>
			<ul className="menu-items">
				<li>
					<Link to="/" onClick={onClose}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/menu" onClick={onClose}>
						Menu
					</Link>
				</li>
				<li>
					<Link to="/contact" onClick={onClose}>
						Contact Us
					</Link>
				</li>
				{isLoggedIn ? (
					<>
						<li>
							<Link to="/profile" onClick={onClose}>
								Profile
							</Link>
						</li>
						<li>
							<button
								onClick={() => {
									handleLogout();
									onClose();
								}}
							>
								Logout
							</button>
						</li>
					</>
				) : (
					<li>
						<button
							onClick={() => {
								handleLogin();
								onClose();
							}}
						>
							Login
						</button>
					</li>
				)}
			</ul>
		</div>
	);
};

export default SliderMenu;
