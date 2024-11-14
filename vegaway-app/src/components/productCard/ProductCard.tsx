// src/components/productCard/ProductCard.tsx
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
	item: {
		id: string;
		name: string;
		price: number;
	};
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const navigate = useNavigate();

	const handleInfoClick = () => {
		navigate(`/product/${item.id}`);
	};

	return (
		<li className="product-card">
			<div className="product-card__image-container">
				<img
					className="product-card__image"
					src="https://placehold.co/200x115"
					alt={item.name}
				/>
				<button className="product-card__add-button">+</button>
			</div>
			<div className="product-card__info">
				<div className="product-card__title-price">
					<p className="product-card__title">{item.name}</p>
					<p className="product-card__price">${item.price.toFixed(2)}</p>
				</div>
				<button className="product-card__info-button" onClick={handleInfoClick}>
					Info
				</button>
			</div>
		</li>
	);
};

export default ProductCard;

/**
 * Författare Jacob
 */
