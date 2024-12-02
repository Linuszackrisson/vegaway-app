import axios from "axios";
import { MenuItem } from "./menuApi";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export const updateOrder = async (
  orderId: string,
  items: MenuItem[],
  totalPrice: number
) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    const idToken = localStorage.getItem("id_token");

    if (!idToken || !accessToken) {
      throw new Error("Access or id token not found");
    }

    const response = await axios.put(
      `${invokeUrl}/staff/orders/pending`,
      {
        orderId,
        items,
        totalPrice,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: API_KEY,
          "x-cognito-auth": `Bearer ${accessToken}`,
          "x-cognito-id": `Bearer ${idToken}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
};

/* 
Författare: Isak

Request fil som låter staff uppdatera en pending order. 
*/
