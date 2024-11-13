import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface MenuItem {
  menuId: number;
  name: string;
  description: string;
  price: number;
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await axios.get<{ data: MenuItem[] }>(`${invokeUrl}/menu`, {
      headers: {
        Authorization: API_KEY,
      },
    });
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
 */