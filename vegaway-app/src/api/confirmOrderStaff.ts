import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface OrderId {
  orderId: string;
}

/**
 * Confirms an order by staff.
 * @param orderId - Sends the orderId to the backend
 * @returns Success message.
 */
export async function confirmOrder(order: OrderId) {
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
