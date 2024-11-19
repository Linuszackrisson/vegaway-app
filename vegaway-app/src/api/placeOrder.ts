import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface Order {
  customerEmail: string;
  items: Array<{
    itemId: string;
    quantity: number;
  }>;
}

/**
 * Submits a new order to the API.
 * @param order - The order details.
 * @returns A promise resolving to the server's response.
 */

export async function createOrder(order: Order) {
  try {
    const response = await axios.post(`${invokeUrl}/orders`, order, {
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}
