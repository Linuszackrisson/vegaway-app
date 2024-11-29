// src/api/menuApi.ts
import axios from "axios";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;
const API_KEY = "MY_API_KEY";

export interface MenuItem {
	menuId: string;
	name: string;
	description: string;
	price: number;
	category: string;
	imageUrl: string;
	quantity: number; 
}

export const fetchMenuItems = async (): Promise<MenuItem[]> => {
	try {
		const response = await axios.get<{ data: MenuItem[] }>(
			`${invokeUrl}/menu`,
			{
				headers: {
					Authorization: API_KEY,
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
 * hantera fel. Via INVOKE. Adderade nu en category string och imageUrl.
 * 
 * Uppdaterad Jacob
 * lagt till imageURL
 */
