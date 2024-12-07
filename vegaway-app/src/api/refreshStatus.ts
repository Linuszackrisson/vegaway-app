import axios from "axios";
import { useFeedbackStore } from "../store/useFeedbackStore";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

interface OrderStatus {
  isConfirmed: string;
}

export async function refreshStatus(orderId: string): Promise<OrderStatus> {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    if (!accessToken || !idToken) {
      // Get the setter functions from Zustand store
      const { setMessage, setVisibility } = useFeedbackStore.getState();

      // Set the feedback message and make the overlay visible
      setMessage("Please login to refresh status");
      setVisibility(true);
      throw new Error("Access token or id token not found.");
    }

    const response = await axios.get(`${invokeUrl}/orders/status/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`,
        "x-cognito-id": `Bearer ${idToken}`,
      },
    });

    const { isConfirmed } = response.data.data;

    return { isConfirmed }; // Return order status value
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error(`Failed to fetch order status: ${error}`);
  }
}

/* Författare: Isak
 *
 * Api request som används för att kolla statusen på en order.
 */

/* Uppdatering: Isak
 *
 * Triggar feedback komponenten om användaren inte är inloggad
 */
