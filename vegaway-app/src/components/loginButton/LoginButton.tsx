import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const LoginButton: React.FC = () => {
  // Get the access token from local storage to determine if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in when the component mounts
  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      try {
        // Decode the JWT to extract the expiration time
        const decodedToken: { exp: number } = jwtDecode(accessToken);
        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

        // Check if the token is still valid
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          // Remove expired token
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

  // Import the environment variables individually
  const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
  const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
  const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;

  const handleLogin = () => {
    // Construct the signIn URL with the imported variables
    const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
    window.location.href = signInUrl;
  };

  const handleLogout = () => {
    // Import Cognito domain and redirect URI
    const logoutRedirectUri = import.meta.env.VITE_APP_URL;
    const logoutUrl = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${logoutRedirectUri}`;

    // Clear local storage
    localStorage.removeItem("access_token");
    setIsLoggedIn(false); // Update the state to reflect the user is logged out

    // Redirect to Cognito's logout endpoint
    window.location.href = logoutUrl;
  };

  return (
    <button
      className="login-button"
      onClick={isLoggedIn ? handleLogout : handleLogin}
    >
      {isLoggedIn ? "Log Out" : "Sign In"}
    </button>
  );
};

export default LoginButton;

/* 
Författare: Isak
En simpel login knapp som triggar cognitos hosted ui för login och sign up

Uppdatering - Isak
Nu visar isLoggedIn state korrekt baserat på tokens expiration time. Innan kunde detta state vara true även fast expiration time hade passerat på dessa tokens
*/
