import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import './CartPage.css';

function CartPage() {
  const cartItems = useCartStore((state) => state.items);

  useEffect(() => {
    console.log('Current cart:', cartItems);
  }, [cartItems]);

  return (
    <div>
      <h1>Cart Page</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.menuId}>
              {item.name} - ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CartPage;