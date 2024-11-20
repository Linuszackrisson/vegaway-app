import React from 'react';
import './CardProductCard.css';
import { MenuItem } from '../../api/menuApi';
import { useCartStore } from '../../store/cartStore';

interface CartProductCardProps {
  item: MenuItem;
}

const CartProductCard: React.FC<CartProductCardProps> = ({ item }) => {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const addToCart = useCartStore((state) => state.addToCart);
  const cartItems = useCartStore((state) => state.items);
  const itemCount = cartItems.filter(cartItem => cartItem.menuId === item.menuId).length;

  const handleIncrease = () => {
    addToCart(item);
  };

  const handleDecrease = () => {
    if (itemCount > 1) {
      removeFromCart(item.menuId);
    } else {
      removeFromCart(item.menuId);
    }
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
      <div className="cart-product-card__info" style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <h3 className="cart-product-card__title">{item.name}</h3>
          <div className="cart-product-card__quantity-controls">
            <button className="cart-product-card__remove-button" onClick={handleDecrease}>-</button>
            <span className="cart-product-card__quantity">{itemCount}</span>
            <button className="cart-product-card__add-button" onClick={handleIncrease}>+</button>
          </div>
        </div>
        <p className="cart-product-card__price">${item.price.toFixed(2)}</p>
        <button className="cart-product-card__info-button">info &gt;</button>
      </div>
    </div>
  );
};

export default CartProductCard;
