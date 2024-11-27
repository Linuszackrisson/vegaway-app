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
    console.error("Error creating order:", error);
    throw new Error(`Failed to create order: ${error}`);
  }
}

/*
 * Författare: Isak
 *
 * Api request för att låta kund uppdatera en order
 * Skickar order från useCurrentOrderStore till backend som hanterar uppdateringen
 */
