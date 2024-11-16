// src/components/ProductSlider/ProductSlider.tsx
import ProductCard from "../productCard/ProductCard";
import "./ProductSlider.css";
import { useState } from "react";

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
	const [filteredItems, setFilteredItems] = useState<ProductItem[]>(items);
	const [isAscending, setIsAscending] = useState<boolean>(true); 

	const filterByPrice = () => {
		const sortedItems = [...items].sort((a, b) => isAscending ? a.price - b.price : b.price - a.price); 
		setFilteredItems(sortedItems);
		setIsAscending(!isAscending); 
	};

	return (
		<div className="product-slider">
			<h2 className="product-slider__title">
				{title}
				<button className="filter-button" onClick={filterByPrice}>
					{isAscending ? "Högst till lägst" : "Lägst till högst"}
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
 */