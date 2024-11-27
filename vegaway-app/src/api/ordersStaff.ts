import axios from "axios";
import { FetchOrdersResponse } from "./utils/orderInterface";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export async function fetchOrders(
  isConfirmed: string
): Promise<FetchOrdersResponse> {
  try {
    if (isConfirmed !== "true" && isConfirmed !== "false") {
      throw new Error("Invalid isConfirmed value. Must be 'true' or 'false'.");
    }

    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await axios.get(
      `${invokeUrl}/staff/orders/${isConfirmed}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "x-cognito-auth": `Bearer ${accessToken}`,
        },
      }
    );

    return {
      message: response.data.message,
      orders: response.data.data, // Assuming the API returns orders in `data`
    };
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw new Error(`Failed to fetch orders: ${error}`);
  }
}

/*
 * Författare: Isak
 *
 * Api request som låter staff hämta orders baserat på isConfirmed på ordern i databasen.
 * Använd "true" som argument för att hämta active orders
 * Använd "false" som argument för att hämta pending orders
 */
