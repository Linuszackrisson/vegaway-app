import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

interface Item {
  category: string;
  description: string;
  imageUrl: string;
  menuId: string;
  name: string;
  price: number;
}

interface Order {
  orderId: string;
  createdAt: number;
  isConfirmed: string;
  customerEmail: string;
  totalPrice: number;
  items: Item[];
  note?: string;
}

interface FetchOrdersResponse {
  message: string;
  orders: Order[];
}

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
