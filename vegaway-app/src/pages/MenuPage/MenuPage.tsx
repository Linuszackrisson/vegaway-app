// src/pages/MenuPage/MenuPage.tsx
import { useEffect, useState } from "react";
import { fetchMenuItems, MenuItem } from "../../api/menuApi";
import "./MenuPage.css";
import ProductSlider from "../../components/productSlider/ProductSlider";


interface ProductItem {
	id: string;
	name: string;
	price: number;
}

function MenuPage() {
	const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

	useEffect(() => {
		const getMenuItems = async () => {
			const items = await fetchMenuItems();
			setMenuItems(items);
		};
		getMenuItems();
	}, []);

	const groupedItems: Record<string, ProductItem[]> = {}; 

	menuItems.forEach(item => {
		const productItem: ProductItem = { id: item.menuId, name: item.name, price: item.price };
		if (!groupedItems[item.category]) {
			groupedItems[item.category] = []; // 
		}
		groupedItems[item.category].push(productItem); 
	});

	return (
		<div className="menu-page">
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
 */
 
