import React from "react";
import "./CardProductCard.css";
import { MenuItem } from "../../api/menuApi";
import { useCartStore } from "../../store/cartStore";
import chevronLeft from "../../assets/chevron-left.svg";
import chevronRight from "../../assets/chevron-right.svg";
import { useNavigate } from "react-router-dom";
import { useCurrentOrderStore } from "../../store/useCurrentOrderStore";

interface CartProductCardProps {
  item: MenuItem;
  editOrder?: boolean;
}

const CartProductCard: React.FC<CartProductCardProps> = ({
  item,
  editOrder,
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

  // Determine the item count (quantity) from the current order if editOrder is true, else from cart
  const itemCount = editOrder
    ? currentOrderItems.filter((orderItem) => orderItem.menuId === item.menuId)
        .length
    : cartItems.filter((cartItem) => cartItem.menuId === item.menuId).length;

  // Handle increasing the quantity of an item
  const handleIncrease = () => {
    if (editOrder) {
      increaseQuantityInOrder(item); // Add item to the current order store
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
    <div className="cart-product-card">
      <div className="cart-product-card__image-container">
        <img
          className="cart-product-card__image"
          src={item.imageUrl}
          alt={item.name}
        />
      </div>
      <div
        className="cart-product-card__info"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <h3 className="cart-product-card__title">{item.name}</h3>
          <div className="cart-product-card__quantity-controls">
            <img
              className="cart-product-card__remove-button"
              src={chevronLeft}
              alt="Decrease"
              onClick={handleDecrease}
            />
            <span className="cart-product-card__quantity">{itemCount}</span>
            <img
              className="cart-product-card__add-button"
              src={chevronRight}
              alt="Increase"
              onClick={handleIncrease}
            />
          </div>
        </div>
        <p className="cart-product-card__price">
          ${(item.price * itemCount).toFixed(2)}
        </p>
        <button
          className="cart-product-card__info-button"
          onClick={handleInfoClick}
        >
          info
        </button>
      </div>
    </div>
  );
};

export default CartProductCard;

/* Författare Linus
 *  Hela komponenten, nu ska det sänka och höja som väntat och se ut enligt skiss.
 *
 */
