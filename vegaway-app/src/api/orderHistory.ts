import axios from "axios";
import { FetchOrdersResponse } from "./utils/orderInterface";
import { useFeedbackStore } from "../store/useFeedbackStore";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export async function fetchOrderHistory(): Promise<FetchOrdersResponse> {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (!accessToken || !idToken) {
      // Get the setter functions from Zustand store
      const { setMessage, setVisibility } = useFeedbackStore.getState();

      // Set the feedback message and make the overlay visible
      setMessage("Please login to fetch order history");
      setVisibility(true);
      throw new Error("Access token or id token not found.");
    }

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
