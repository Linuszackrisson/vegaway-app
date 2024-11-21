// src/utils/auth.ts
import { jwtDecode } from "jwt-decode";

/**
 * Retrieves the authentication headers for API requests.
 * @returns An object containing the necessary authentication headers.
 */
export const getAuthHeaders = (): { [key: string]: string } | null => {
	const accessToken = localStorage.getItem("access_token");

	if (!accessToken) {
		console.warn("No access token found in localStorage");
		return null;
	}

	return {
		"x-cognito-auth": accessToken,
	};
};

/**
 * Decodes the ID token to extract user information.
 * @returns An object containing user information.
 */
export const getUserInfo = (): { [key: string]: any } | null => {
	const idToken = localStorage.getItem("id_token");

	if (!idToken) {
		console.warn("No ID token found in localStorage");
		return null;
	}

	try {
		const decodedToken = jwtDecode(idToken);
		return decodedToken;
	} catch (error) {
		console.error("Error decoding ID token:", error);
		return null;
	}
};

/**
 * Logs out the user by clearing tokens and redirecting to Cognito's logout endpoint.
 */
export const logout = () => {
	const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
	const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
	const logoutRedirectUri: string = import.meta.env.VITE_APP_URL;
	const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

	// Clear tokens from local storage
	localStorage.removeItem("access_token");
	localStorage.removeItem("id_token");

	// Redirect to Cognito's logout endpoint
	window.location.href = logoutUrl;
};

/* 
Författare: Isak

Utility functions for authentication, including getAuthHeaders, getUserInfo, and logout.
*/
