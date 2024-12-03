import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useCartStore } from "../store/cartStore";
import { useCurrentOrderStore } from "../store/useCurrentOrderStore";
import { useFeedbackStore } from "../store/useFeedbackStore";

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
 * Handles the entire order creation process, including fetching cart state,
 * decoding user email, and clearing the cart after successful order placement.
 */
export async function createOrder() {
  try {
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      // Get the setter functions from Zustand store
      const { setMessage, setVisibility } = useFeedbackStore.getState();

      // Set the feedback message and make the overlay visible
      setMessage("Please login to complete the order.");
      setVisibility(true);
      throw new Error("ID token not found.");
    }

    const customerEmail = getEmailFromIdToken(idToken);

    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    // Access cart state from the store
    const { items, getTotalPrice, clearCart } = useCartStore.getState();

    if (items.length === 0) {
      throw new Error("Cart is empty. Cannot create order.");
    }

    const totalPrice = getTotalPrice();

    const orderWithEmail: Order = { items, totalPrice, customerEmail };

    // Send the order request
    const response = await axios.post(`${invokeUrl}/orders`, orderWithEmail, {
      headers: {
        "Content-Type": "application/json",
        Authorization: API_KEY,
        "x-cognito-auth": `Bearer ${accessToken}`,
      },
    });

    console.log(response.data.data);

    const orderData = response.data.data;
    // Save the full order in the useCurrentOrderStore
    useCurrentOrderStore.getState().setOrder({
      orderId: orderData.order.orderId,
      customerEmail: orderData.order.customerEmail,
      createdAt: orderData.order.createdAt,
      isConfirmed: orderData.order.isConfirmed,
      items: orderData.order.items, // Extract items from response
      totalPrice: orderData.order.totalPrice,
    });
    // Clear the cart after successful order creation
    clearCart();

    return response.data.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw new Error(`Failed to create order: ${error}`);
  }
}

/* 
Författare: Isak

Funktion createOrder hämtar cart state och lägger en order.
Helper funktion getEmailFromIdToken används för att decoda id token så användarens mail kan läggas till i ordern.
*/

/* 
Uppdated Jacob
Saving orderID in local storage. 
*/

/* 
Updated: Isak

Saving the order to useCurrentOrderStore
*/

/* 
Uppdatering: Isak

Triggar feedback komponenten om användaren inte är inloggad
*/
