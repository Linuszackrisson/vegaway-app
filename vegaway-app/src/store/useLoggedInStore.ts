import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

// Define the type for the decoded token
interface DecodedToken {
  exp: number; // Expiration time in seconds since epoch
}

const useLoggedInStore = create((set) => ({
  isLoggedIn: false,

  updateLoginState: () => {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    let isValid = false;

    if (accessToken && idToken) {
      try {
        // Decode token with the defined type
        const { exp } = jwtDecode<DecodedToken>(accessToken);
        isValid = exp * 1000 > Date.now(); // Convert expiration to milliseconds
      } catch (error) {
        console.error("Invalid token:", error);
        isValid = false;
      }
    }

    set({ isLoggedIn: isValid });
  },
}));

export default useLoggedInStore;
