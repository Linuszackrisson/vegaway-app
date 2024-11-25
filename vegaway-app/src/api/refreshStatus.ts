import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

interface OrderStatus {
  isConfirmed: string;
}

export async function refreshStatus(orderId: string): Promise<OrderStatus> {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");
    if (!accessToken || !idToken) {
      throw new Error("Access token or ID token not found.");
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

/* 
Författare: Isak

Api request som används för att kolla statusen på en order.
*/
