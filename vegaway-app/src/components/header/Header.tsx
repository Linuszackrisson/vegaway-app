// src/components/header/Header.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Menu, User, LogIn } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useMenu } from "../../contexts/MenuContext";
import "./Header.css";

const Header: React.FC = () => {
	const { isAuthenticated } = useAuth();
	const { openMenu } = useMenu();

	const handleLogin = () => {
		const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
		const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
		const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;
		const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
		window.location.href = signInUrl;
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
				{isAuthenticated ? (
					<Link to="/profile">
						<User />
					</Link>
				) : (
					<button className="login-button" onClick={handleLogin}>
						<LogIn />
					</button>
				)}
			</div>
		</header>
	);
};

export default Header;
