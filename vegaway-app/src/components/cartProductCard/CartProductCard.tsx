// src/components/CartProductCard/CartProductCard.tsx
import { useState, useEffect } from "react";
import { MenuItem } from "../../api/menuApi";
import { useCartStore } from "../../store/cartStore";
import { useNavigate } from "react-router-dom";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";
import Icon from "../icon/Icon";
import "./cartProductCard.css";

interface CartProductCardProps {
  item: MenuItem;
  editOrder?: boolean;
  isStaffOrderDetails?: boolean;
  isActiveOrder?: boolean;
  onUpdateItem?: (menuId: string, updatedQuantity: number) => void;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  item,
  editOrder,
  isActiveOrder,
  isStaffOrderDetails,
  onUpdateItem,
}) => {
  const navigate = useNavigate();
  // Cart store actions
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);

  // Current order store actions
  const removeFromOrder = useCurrentOrderStore(
    (state) => state.removeFromOrder
  );
  const decreaseQuantityInOrder = useCurrentOrderStore(
    (state) => state.decreaseQuantity
  );
  const increaseQuantityInOrder = useCurrentOrderStore(
    (state) => state.increaseQuantity
  );
  const currentOrder = useCurrentOrderStore((state) => state.order); // Get the entire order object
  const currentOrderItems = currentOrder ? currentOrder.items : []; // Access items if order exists, else default to an empty array

  // Staff order details actions
  const [localQuantity, setLocalQuantity] = useState<number>(item.quantity);

  useEffect(() => {
    // Ensure the updated quantity is propagated to the parent on change
    if (onUpdateItem) {
      onUpdateItem(item.menuId, localQuantity);
    }
  }, [localQuantity]); // Effect runs when localQuantity changes

  // Determine the item count (quantity) from the current order if editOrder is true, else from cart
  const itemCount = editOrder
    ? currentOrderItems.filter((orderItem) => orderItem.menuId === item.menuId)
        .length
    : isStaffOrderDetails
    ? localQuantity // Use the provided quantity directly when isStaffOrderDetails is true
    : cartItems.filter((cartItem) => cartItem.menuId === item.menuId).length;
  console.log("Item count:", itemCount);

  // Handle increasing the quantity of an item
  const handleIncrease = () => {
    if (editOrder) {
      increaseQuantityInOrder(item); // Add item to the current order store
    } else if (isStaffOrderDetails) {
      setLocalQuantity((prev) => prev + 1);
    } else {
      addToCart(item); // Add item to the cart store
    }
  };

  // Handle decreasing the quantity of an item
  const handleDecrease = () => {
    if (editOrder) {
      if (itemCount > 1) {
        decreaseQuantityInOrder(item.menuId); // Decrease quantity in current order
      } else {
        removeFromOrder(item.menuId); // Remove item from current order
      }
    } else if (isStaffOrderDetails) {
      setLocalQuantity((prev) => (prev > 0 ? prev - 1 : 0));
    } else {
      if (itemCount > 1) {
        decreaseQuantity(item.menuId); // Decrease quantity in cart
      } else {
        removeFromCart(item.menuId); // Remove item from cart
      }
    }
  };

  const handleInfoClick = () => {
    navigate(`/product/${item.menuId}`);
  };

  return (
    <div className="card cart-product-card">
      <div className="cart-product-card__image-container">
        <img
          className="cart-product-card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div className="cart-product-card__info">
        <div className="cart-product-card__header">
          <h3 className="cart-product-card__title">{item.name}</h3>

          <div className="cart-product-card__quantity-controls">
            {/* Hide buttons when isActiveOrder is true */}
            {!isActiveOrder && (
              <>
                <button
                  className="button button--icon cart-product-card__remove-button"
                  onClick={handleDecrease}
                >
                  <Icon name="Minus" className="icon" />
                </button>
                <span className="cart-product-card__quantity">{itemCount}</span>
                <button
                  className="button button--icon cart-product-card__add-button"
                  onClick={handleIncrease}
                >
                  <Icon name="Plus" className="icon" />
                </button>
              </>
            )}
            {/* Always display the quantity */}
            {isActiveOrder && (
              <span className="cart-product-card__quantity">{itemCount}</span>
            )}
          </div>
        </div>
        <p className="cart-product-card__price">
          ${(item.price * itemCount).toFixed(2)}
        </p>
        <button
          className="button button--third cart-product-card__info-button"
          onClick={handleInfoClick}
        >
          <span className="button__text">Info</span>
          <Icon name="ChevronRight" className="button__icon" />
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;

/* Författare Linus
 *  Hela komponenten, nu ska det sänka och höja som väntat och se ut enligt skiss.
/
Uppdatering: Isak
Använder funktioner villkorligt beroende på props som skickas med till denna komponent.
/
Uppdatering: Isak
Tar emot onUpdateItem som prop för att skicka tillbaka korrekt värden till förälder komponent när isStaffOrderDetails är true
/
Uppdatering: Jacob
Globala klassvariabler, lagat broken design, uppdaterad förenklad CSS, ny styling på increase/decrease knappar.
*/
