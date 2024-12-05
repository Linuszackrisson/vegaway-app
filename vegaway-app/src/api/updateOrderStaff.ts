import axios from "axios";
import { MenuItem } from "./menuApi";
import { useFeedbackStore } from "../store/useFeedbackStore";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

export const updateOrder = async (
  orderId: string,
  items: MenuItem[],
  totalPrice: number
) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (!idToken || !accessToken) {
      // Get the setter functions from Zustand store
      const { setMessage, setVisibility } = useFeedbackStore.getState();

      // Set the feedback message and make the overlay visible
      setMessage("Please login to update order");
      setVisibility(true);
      throw new Error("Access or id token not found");
    }

    const response = await axios.put(
      `${invokeUrl}/staff/orders/pending`,
      {
        orderId,
        items,
        totalPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "x-cognito-auth": `Bearer ${accessToken}`,
          "x-cognito-id": `Bearer ${idToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

/* 
Författare: Isak

Request fil som låter staff uppdatera en pending order. 
*/

/* 
Uppdatering: Isak

Triggar feedback komponenten om användaren inte är inloggad
*/
