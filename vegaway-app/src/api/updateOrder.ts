import axios from "axios";
import { useFeedbackStore } from "../store/useFeedbackStore";
import { useCurrentOrderStore } from "../store/useCurrentOrderStore";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Get the setter functions from Zustand store
const { setMessage, setVisibility } = useFeedbackStore.getState();

export async function updateOrder() {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (!idToken || !accessToken) {
      // Set the feedback message and make the overlay visible
      setMessage("Please login to update order");
      setVisibility(true);
      throw new Error("Access or id token not found");
    }

    const { order } = useCurrentOrderStore.getState();

    const response = await axios.put(`${invokeUrl}/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`,
        "x-cognito-id": `Bearer ${idToken}`,
      },
    });

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Accessing error.response safely
      const errorMessage =
        error.response?.data?.message || "Unknown error occurred";
      setMessage(errorMessage);
      setVisibility(true);

      throw new Error(errorMessage);
    } else {
      console.error("Unexpected error:", error);
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

/* Författare: Isak
 *
 * Api request för att låta kund uppdatera en order.
 * Skickar order från useCurrentOrderStore till backend som hanterar uppdateringen.
 */

/* Uppdatering: Isak
 *
 * Triggar feedback komponenten om användaren inte är inloggad eller om ordern redan är confirmed.
 */
