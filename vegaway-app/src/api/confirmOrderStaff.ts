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
    if (!accessToken) {
      throw new Error("Access token not found.");
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
