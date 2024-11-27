import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";
import { useCurrentOrderStore } from "../store/useCurrentOrderStore";

export async function updateOrder() {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (!idToken || !accessToken) {
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
      console.error(
        "%cError updating order: " + errorMessage,
        "color: red; font-size: 16px; font-weight: bold; background-color: yellow; padding: 2px 5px; border-radius: 4px;"
      );
      throw new Error(`Failed to update order: ${errorMessage}`);
    } else {
      console.error("Unexpected error:", error);
      throw new Error(`Unexpected error: ${error}`);
    }
  }
}

/*
 * Författare: Isak
 *
 * Api request för att låta kund uppdatera en order
 * Skickar order från useCurrentOrderStore till backend som hanterar uppdateringen
 */
