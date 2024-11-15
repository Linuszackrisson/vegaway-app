import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface MenuItem {
  menuId: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    // Retrieve the JWT token from localStorage
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      throw new Error("No access token found");
    }

    const response = await axios.get<{ data: MenuItem[] }>(
      `${invokeUrl}/menu`,
      {
        headers: {
          Authorization: API_KEY,
          "x-cognito-auth": accessToken,
        },
      }
    );
    return response.data.data || [];
  } catch (error) {
    console.error("Error fetching menu:", error);
    return [];
  }
};

/**
 * Författare: Linus
 *
 * API-anrop för att hämta menyobjekt och
 * hantera fel. Via ENVOKE. Fuck CORS!
 * Adderade nu en category string.
 */

/*
 * Tillägg: Isak
 * Hämtar accesstoken från local storage och använder det i request headern
 */
