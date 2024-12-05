import axios from "axios";
import { FetchOrdersResponse } from "./utils/orderInterface";
import { useFeedbackStore } from "../store/useFeedbackStore";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export async function fetchOrders(
  isConfirmed: string
): Promise<FetchOrdersResponse> {
  try {
    if (isConfirmed !== "true" && isConfirmed !== "false") {
      throw new Error("Invalid isConfirmed value. Must be 'true' or 'false'.");
    }

    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    if (!accessToken || !idToken) {
      // Get the setter functions from Zustand store
      const { setMessage, setVisibility } = useFeedbackStore.getState();

      // Set the feedback message and make the overlay visible
      setMessage("Please login to fetch orders");
      setVisibility(true);
      throw new Error("Access token or id token not found.");
    }

    const response = await axios.get(
      `${invokeUrl}/staff/orders/${isConfirmed}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "x-cognito-auth": `Bearer ${accessToken}`,
          "x-cognito-id": `Bearer ${idToken}`,
        },
      }
    );

    return {
      message: response.data.message,
      orders: response.data.data, // Assuming the API returns orders in `data`
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error}`);
  }
}

/*
 * Författare: Isak
 *
 * Api request som låter staff hämta orders baserat på isConfirmed på ordern i databasen.
 * Använd "true" som argument för att hämta active orders
 * Använd "false" som argument för att hämta pending orders
 */

/* 
Uppdatering: Isak

Triggar feedback komponenten om användaren inte är inloggad
*/
