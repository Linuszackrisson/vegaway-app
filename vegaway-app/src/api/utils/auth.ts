import { jwtDecode } from "jwt-decode";

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

/* 
Författare: Isak

Utility functions for authentication, including getAuthHeaders and getUserInfo.
*/
