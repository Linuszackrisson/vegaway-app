import './ProductCard.css';
import { useNavigate } from 'react-router-dom';
import { Plus, ChevronRight } from 'lucide-react';
import { MenuItem } from '../../api/menuApi';
import { useCartStore } from '../../store/cartStore';

interface ProductCardProps {
	item: MenuItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
	const navigate = useNavigate();
	const addToCart = useCartStore(state => state.addToCart);

	const handleInfoClick = () => {
		navigate(`/product/${item.menuId}`);
	};

	const handleAddToCart = () => {
		addToCart(item);
		console.log('Varukorg:', useCartStore.getState().items);
	};

	return (
		<li className="product-card">
			<div className="product-card__image-container">
				<img className="product-card__image" src={item.imageUrl} alt={item.name} />
				<button className="button button--first product-card__add-button" onClick={handleAddToCart}>
					<Plus className="icon" strokeWidth={1.5} />
				</button>
			</div>
			<div className="product-card__info">
				<div className="product-card__title-price">
					<h3 className="product-card__title">{item.name}</h3>
					<p className="product-card__price">${item.price.toFixed(2)}</p>
				</div>
				<button className="button button--third product-card__info-button" onClick={handleInfoClick}>
					<span className="button__text">Info</span>
					<ChevronRight className="button__icon" strokeWidth={1.5} />
				</button>
			</div>
		</li>
	);
};

export default ProductCard;

/*
 * Uppdaterade komponenten:
 * - Lade till onClick-hanterare för "Info"-knappen för att navigera till produktens sida.
 * - "Info"-knappen anropar nu handleInfoClick vid klick.
 *
 * Uppdaterad Jacob
 * Förenklade propsen använder menuItem
 */
