// src/components/ProductSlider/ProductSlider.tsx
import ProductCard from "../productCard/ProductCard";
import "./ProductSlider.css";

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
	return (
		<div className="product-slider">
			<h2 className="product-slider__title">{title}</h2>
			<ul className="product-slider__list">
				{items.map((item) => (
					<ProductCard key={item.id} item={item} />
				))}
			</ul>
		</div>
	);
};

export default ProductSlider;

/**
 * Författare Jacob
 */
