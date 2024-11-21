// src/components/sliderMenu/SliderMenu.tsx
import React from "react";
import { Link } from "react-router-dom";
import { useMenu } from "../../contexts/MenuContext";
import { useAuth } from "../../contexts/AuthContext";
import "./SliderMenu.css";

const SliderMenu: React.FC = () => {
	const { isMenuOpen, closeMenu } = useMenu();
	const { isAuthenticated, logout } = useAuth();

	const menuClass = isMenuOpen ? "slider-menu open" : "slider-menu";

	const handleLogin = () => {
		const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
		const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
		const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;
		const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
		window.location.href = signInUrl;
	};

	return (
		<div className={menuClass}>
			<button className="close-button" onClick={closeMenu}>
				Close
			</button>
			<ul className="menu-items">
				<li>
					<Link to="/" onClick={closeMenu}>
						Home
					</Link>
				</li>
				<li>
					<Link to="/menu" onClick={closeMenu}>
						Menu
					</Link>
				</li>
				<li>
					<Link to="/contact" onClick={closeMenu}>
						Contact Us
					</Link>
				</li>
				{isAuthenticated ? (
					<>
						<li>
							<Link to="/profile" onClick={closeMenu}>
								Profile
							</Link>
						</li>
						<li>
							<button
								onClick={() => {
									logout();
									closeMenu();
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
								closeMenu();
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
