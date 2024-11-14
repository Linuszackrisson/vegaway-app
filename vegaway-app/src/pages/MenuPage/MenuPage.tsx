// src/pages/MenuPage/MenuPage.tsx
import "./MenuPage.css";
import ProductSlider from "../../components/productSlider/ProductSlider";

function MenuPage() {
	// Statiska placeholder-produkter
	const placeholderItems = [
		{ id: "1", name: "Product 1", price: 9.99 },
		{ id: "2", name: "Product 2", price: 19.99 },
		{ id: "3", name: "Product 3", price: 29.99 },
		{ id: "4", name: "Product 4", price: 39.99 }
	];

	return (
		<div className="menu-page">
			<ProductSlider title="New Releases" items={placeholderItems} />
			<ProductSlider title="Chef's Choice" items={placeholderItems} />
			<ProductSlider title="Classics" items={placeholderItems} />
			<ProductSlider title="Only Greens" items={placeholderItems} />
		</div>
	);
}

export default MenuPage;

/**
 * Författare Jacob
 */
