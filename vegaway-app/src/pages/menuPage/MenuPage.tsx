// src/pages/MenuPage/MenuPage.tsx
import { useEffect, useState } from "react";
import { fetchMenuItems, MenuItem } from "../../api/menuApi";
import ProductSlider from "../../components/productSlider/ProductSlider";
import "./menuPage.css";

function MenuPage() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		const getMenuItems = async () => {
			const items = await fetchMenuItems();
			setMenuItems(items);
		};
		getMenuItems();
	}, []);

	const groupedItems = menuItems.reduce<Record<string, MenuItem[]>>(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{}
	);

	return (
		<div className="menu-page wrapper">
			{Object.entries(groupedItems).map(([category, items]) => (
				<ProductSlider key={category} title={category} items={items} />
			))}
		</div>
	);
}

export default MenuPage;

/**
 * Författare Linus
 * MenuPage, visar alla produkter i menyerna.
 * Byggd enligt skiss.
 * Använder ProductSlider för att visa produkterna i varje meny.
 * 
 * Uppdaterad Jacob
 * förenklat dataflöte
 */
