// src/components/loginButton/LoginButton.tsx
import React, { useEffect } from 'react';
import useAuthStore from '../../store/useLoggedInStore'; // Import the Zustand store
import Icon from '../icon/Icon'; // Import the Icon component

interface LoginButtonProps {
	variant?: 'icon-only' | 'full';
}

const LoginButton: React.FC<LoginButtonProps> = ({ variant = 'full' }) => {
	const { isLoggedIn, updateLoginState } = useAuthStore(); // Zustand state and updater

	useEffect(() => {
		// Update login state when the component mounts
		updateLoginState();
	}, [updateLoginState]);

	// Import environment variables
	const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
	const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
	const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;

	const handleLogin = () => {
		// Construct the sign-in URL
		const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
		window.location.href = signInUrl;
	};

	const handleLogout = () => {
		// Import Cognito domain and redirect URI
		const logoutRedirectUri = import.meta.env.VITE_APP_URL;
		const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

		// Clear local storage
		localStorage.removeItem('access_token');
		localStorage.removeItem('id_token'); // Assuming you store id_token as well

		// Update global state
		updateLoginState();

		// Redirect to Cognito's logout endpoint
		window.location.href = logoutUrl;
	};

	if (variant === 'icon-only') {
		return (
			<button className="button button--fourth login-button" onClick={isLoggedIn ? handleLogout : handleLogin}>
				<Icon name={isLoggedIn ? 'LogOut' : 'LogIn'} className="icon" />
			</button>
		);
	}

	return (
		<button className="button button--second login-button" onClick={isLoggedIn ? handleLogout : handleLogin}>
			<Icon name={isLoggedIn ? 'LogOut' : 'LogIn'} className="button__icon" />
			<span className="button__text">{isLoggedIn ? 'Sign Out' : 'Sign In'}</span>
			<Icon name="ChevronRight" className="button__icon" />
		</button>
	);
};

export default LoginButton;


/* Uppdaterad: Jacob
-Två varianter av knappen, en med endast ikon och en med text + ikon
*/
