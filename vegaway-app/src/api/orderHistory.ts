import axios from "axios";
import { FetchOrdersResponse } from "./utils/orderInterface";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export async function fetchOrderHistory(): Promise<FetchOrdersResponse> {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    const response = await axios.get(`${invokeUrl}/orders/orderHistory`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`,
        "x-cognito-id": `Bearer ${idToken}`,
      },
    });

    return {
      message: response.data.message,
      orders: response.data.data,
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error}`);
  }
}

/*
 * Författare: Isak
 *
 * Api request fil som hämtar en användares order history
 */
