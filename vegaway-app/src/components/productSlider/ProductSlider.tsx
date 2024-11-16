import ProductCard from "../productCard/ProductCard";
import "./ProductSlider.css";
import { useState, useEffect } from "react";

interface ProductItem {
	id: string;
	name: string;
	price: number;
}

interface ProductSliderProps {
	title: string;
	items: ProductItem[];
}

const ProductSlider: React.FC<ProductSliderProps> = ({ title, items }) => {
	const [filteredItems, setFilteredItems] = useState<ProductItem[]>(
		[...items].sort((a, b) => b.price - a.price)
	);
	const [isAscending, setIsAscending] = useState<boolean>(false);

	const filterByPrice = () => {
		const sortedItems = [...filteredItems].sort((a, b) =>
			isAscending ? b.price - a.price : a.price - b.price
		);
		setFilteredItems(sortedItems);
		setIsAscending(!isAscending);
	};

	return (
		<div className="product-slider">
			<h2 className="product-slider__title">
				{title}
				<button className="filter-button" onClick={filterByPrice}>
					{isAscending ? "Lägst till högst" : "Högst till lägst"}
				</button>
			</h2>
			<ul className="product-slider__list">
				{filteredItems.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
};

export default ProductSlider;

/**
 * Författare Jacob
 * 
 * Författare Linus
 * Uppdaterade komponent för att fungera med ändringar i MenuPage
 * Lade till filtrerings-funktion för priser, högst till lägst och vice verse, samt knapp som lyssnar.
 * 2024-11-16 Uppdaterade funktionen så att det sorteras "Högst till lägst"
 */

