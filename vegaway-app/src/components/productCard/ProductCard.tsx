// src/components/ProductCard/ProductCard.tsx
import { useNavigate } from "react-router-dom";
import Icon from "../icon/Icon";
import { MenuItem } from "../../api/menuApi";
import { useCartStore } from "../../store/cartStore";
import "./productCard.css";
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
    <li className="card product-card">
      <div className="product-card__image-container">
        <img
          className="product-card__image"
          src={item.imageUrl}
          alt={item.name}
        />
        <button
          className="button button--add button--add--small product-card__add-button"
          onClick={handleAddToCart}
        >
          <Icon name="Plus" className="icon" />
        </button>
      </div>
      <div className="product-card__info">
        <div className="product-card__title-price">
          <h3 className="product-card__title">{item.name}</h3>
          <p className="product-card__price">${item.price.toFixed(2)}</p>
        </div>
        <button
          className="button button--third product-card__info-button"
          onClick={handleInfoClick}
        >
          <span className="button__text">Info</span>
          <Icon name="ChevronRight" className="button__icon" />
        </button>
      </div>
    </li>
  );
};

export default ProductCard;

/* Författare: Linus
 *
 * Produktkort som används i menyerna och slidersen på sidan
 * AddtoCart button som lägger till produkterna i CartStore
 * Info button som navigerar till produktens info-sida
 * Byggd enligt skiss. (Omdesignad Later av Jacob med globala styles)
 */

/* Uppdatering: Linus
 *
 * Använde Icon-komponenten för ikonerna.
 * Lade till className="button button--add" på "Lägg till"-knappen.
 */
