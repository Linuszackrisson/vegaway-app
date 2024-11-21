import { useEffect } from "react";
import useAuthStore from "../../store/useLoggedInStore"; // Import the Zustand store

const LoginButton: React.FC = () => {
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token"); // Assuming you store id_token as well

    // Update global state
    updateLoginState();

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
