import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

// Define the type for the decoded token
interface DecodedToken {
  exp: number; // Expiration time in seconds since epoch
}

interface AuthState {
  isLoggedIn: boolean;
  updateLoginState: () => void;
}

const useLoggedInStore = create<AuthState>((set) => ({
  isLoggedIn: false,

  updateLoginState: () => {
    console.log("Checking if user is logged in...");

    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    let isValid = false;

    if (accessToken && idToken) {
      try {
        // Decode token with the defined type
        const { exp } = jwtDecode<DecodedToken>(accessToken);
        isValid = exp * 1000 > Date.now(); // Set isValid to true or false
      } catch (error) {
        console.error("Invalid token:", error);
        isValid = false;
      }
    }

    // If the token is invalid, remove tokens from localStorage
    if (!isValid) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("id_token");
      localStorage.removeItem("cart-storage");
      localStorage.removeItem("current-order");
    }

    set({ isLoggedIn: isValid });
  },
}));

export default useLoggedInStore;

/* 
Författare: Isak

Zustand store för att hålla koll på om en användare är inloggad
*/
