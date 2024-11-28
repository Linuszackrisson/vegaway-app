import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { MenuItem } from "../../api/menuApi";
import { useCartStore } from "../../store/cartStore";

interface ProductCardProps {
  item: MenuItem;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);

  const handleInfoClick = () => {
    navigate(`/product/${item.menuId}`);
  };

  const handleAddToCart = () => {
    addToCart(item);
    console.log("Varukorg:", useCartStore.getState().items);
  };

  return (
		<li className="product-card">
			<div className="product-card__image-container">
				<img
					className="product-card__image"
					src={item.imageUrl}
					alt={item.name}
				/>
				<button
					className="product-card__add-button button--first"
					onClick={handleAddToCart}
				>
					<Plus />
				</button>
			</div>
			<div className="product-card__info">
				<div className="product-card__title-price">
					<h3 className="product-card__title">{item.name}</h3>
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
/*
 * Uppdaterade komponenten så att den fungerar enligt issuen.
 * Adderade funktion för att knappen ska lägga till i varukorgen
 * Lade till logs så vi ser om det fungerar (it actually does)
 *
 * Uppdaterad Jacob
 * Förenklade propsen använder menuItem
 */

