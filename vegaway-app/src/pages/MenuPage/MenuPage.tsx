// src/pages/MenuPage/MenuPage.tsx
import { useEffect, useState } from "react";
import { fetchMenuItems, MenuItem } from "../../api/menuApi";
import "./MenuPage.css";
import ProductSlider from "../../components/productSlider/ProductSlider";

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
 * Implementerat en menyvisning som hämtar och grupperar menyobjekt
 * baserat på kategori och visar dem med hjälp av ProductSlider-komponenten.
 * 
 * Uppdaterad Jacob
 * förenklat dataflöte
 */
