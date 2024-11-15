import React from "react";

const LoginButton: React.FC = () => {
  // Import the environment variables individually
  const cognitoDomain: string = import.meta.env.VITE_COGNITO_DOMAIN;
  const clientId: string = import.meta.env.VITE_COGNITO_CLIENT_ID;
  const redirectUri: string = import.meta.env.VITE_COGNITO_REDIRECT_URI;

  const handleLogin = () => {
    // Construct the signIn URL with the imported variables
    const signInUrl = `${cognitoDomain}/login?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
    window.location.href = signInUrl;
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      Sign In with Cognito
    </button>
  );
};

export default LoginButton;

/* 
Författare: Isak
En simpel login knapp som triggar cognitos hosted ui för login och sign up
*/
