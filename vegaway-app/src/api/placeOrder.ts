import axios from "axios";
import { jwtDecode } from "jwt-decode";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface Order {
  customerEmail: string;
  items: Array<Record<string, any>>;
  totalPrice: number;
}

/**
 * Decodes the ID token to extract the user's email.
 * @param idToken - The ID token from Cognito.
 * @returns The email of the logged-in user.
 */
function getEmailFromIdToken(idToken: string): string {
  const decodedToken: { email?: string } = jwtDecode(idToken);
  if (!decodedToken.email) {
    throw new Error("Email not found in ID token.");
  }
  return decodedToken.email;
}

/**
 * Submits a new order to the API.
 * @param order - The order details excluding the email.
 * @returns A promise resolving to the server's response.
 */
export async function createOrder(order: Omit<Order, "customerEmail">) {
  try {
    const idToken = localStorage.getItem("id_token"); // Get ID token from storage

    if (!idToken) {
      throw new Error("ID token not found.");
    }

    const customerEmail = getEmailFromIdToken(idToken); // Decode ID token to get the email

    // Access token is required for authorization in the header
    const accessToken = localStorage.getItem("access_token"); // Fetch access token from local storage
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const orderWithEmail: Order = { ...order, customerEmail };

    const response = await axios.post(`${invokeUrl}/orders`, orderWithEmail, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`, // Pass the access token in the x-cognito-auth header
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

/* 
Författare: Isak

Funktion createOrder som tar emot varukorgens innehåll, samt totalpriset på varukorgen. 
Helper funktion getEmailFromIdToken används för att decoda id token så användarens mail kan läggas till i ordern.
*/
