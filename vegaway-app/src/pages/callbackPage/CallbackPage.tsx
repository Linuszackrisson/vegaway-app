import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the authorization code from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get("code");

    if (authorizationCode) {
      console.log("Authorization Code:", authorizationCode);

      // Exchange the authorization code for tokens
      const tokenExchange = async () => {
        try {
          const response = await fetch(
            `${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/token`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: import.meta.env.VITE_APP_CLIENT_ID, // Using the client ID from .env
                code: authorizationCode,
                redirect_uri: `${import.meta.env.VITE_APP_URL}callback`, // Your redirect URI
              }),
            }
          );

          const data = await response.json();

          if (response.ok) {
            // Save the tokens (in localStorage/sessionStorage or state)
            console.log("Tokens:", data);

            // Example: Saving tokens to localStorage
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("id_token", data.id_token);

            // Redirect to the home page or your main route
            navigate("/");

            // Reload the page after navigation to update the UI
            window.location.reload();
          } else {
            console.error("Error exchanging code for tokens:", data);
          }
        } catch (error) {
          console.error("Error during token exchange:", error);
        }
      };

      tokenExchange();
    } else {
      console.error("Authorization code is missing.");
    }
  }, [navigate]);

  return (
    <div>
      <h2>Processing your login...</h2>
      <p>Please wait while we authenticate you.</p>
    </div>
  );
};

export default CallbackPage;

/* 
Författare: Isak

Middleman för cognitos hosted ui och våran frontend. Användare blir navigarade till denna komponent efter lyckad inloggning. Denna komponent ansvarar för att hämta JWT access token.

Efter token har blivit hämtad och sparad i local storage navigerar den till default routen "/".
*/
