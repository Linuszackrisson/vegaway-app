import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface OrderIdAndNote {
  orderId: string;
  note?: string; // Optional
}

/**
 * Confirms an order by staff.
 * @param order - Send an object containing orderId (required) and note (optional)
 * @returns Success message.
 */
export async function confirmOrder(order: OrderIdAndNote) {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    if (!accessToken || !idToken) {
      throw new Error("Access token or id token not found.");
    }

    // Initiate the POST request
    const response = await axios.post(
      `${invokeUrl}/staff/orders/confirm`,
      order,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "x-cognito-auth": `Bearer ${accessToken}`,
          "x-cognito-id": `Bearer ${idToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error confirming order:", error);
    throw error;
  }
}

/* 
Författare: Isak

Funktion confirmOrder låter personalen bekräfta en order
*/

/* 
Uppdatering: Isak

Inkluderar id_token i request för att validera att användarkonto är staff
*/
