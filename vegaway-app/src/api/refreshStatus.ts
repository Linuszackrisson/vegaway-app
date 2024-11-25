import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

interface OrderStatus {
  orderId: string;
  status: string;
}

export async function refreshStatus(orderId: string): Promise<OrderStatus> {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await axios.get(`${invokeUrl}/orders/status/${orderId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order status:", error);
    throw new Error(`Failed to fetch order status: ${error}`);
  }
}

/* 
Författare: Isak

Api request som används för att kolla statusen på en order.
*/
