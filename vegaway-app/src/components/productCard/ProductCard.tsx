// src/components/productCard/ProductCard.tsx
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { MenuItem } from "../../api/menuApi";

interface ProductCardProps {
	item: MenuItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const navigate = useNavigate();

	const handleInfoClick = () => {
		navigate(`/product/${item.menuId}`);
	};

	return (
		<li className="product-card">
			<div className="product-card__image-container">
				<img
					className="product-card__image"
					src={item.imageUrl}
					alt={item.name}
				/>
				<button className="product-card__add-button button__first">
					<Plus />
				</button>
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
 *
 * Författare Linus
 * Uppdaterade komponenten så att den fungerar enligt issuen
 * 
 * Uppdaterad Jacob
 * Förenklade propsen använder menuItem
 */
