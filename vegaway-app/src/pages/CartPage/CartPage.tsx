import { useCartStore } from '../../store/cartStore';
import './CartPage.css';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import { MenuItem } from "../../api/menuApi";

function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart); 

  const uniqueCartItems = Array.from(new Map(cartItems.map(item => [item.menuId, item])).values());

  return (
    <div className='cartpage-container'>
      <h1>Cart Page</h1>
      <button onClick={clearCart}>Clear Cart</button>
      {uniqueCartItems.length === 0 ? (
        <p>Tom kundvagn, tom mage.</p>
      ) : (
        <div className="card-container">
          {uniqueCartItems.map((item) => {
            const itemCount = cartItems.filter(cartItem => cartItem.menuId === item.menuId).length;
            return (
              <CartProductCard key={item.menuId} item={{ ...item, count: itemCount } as MenuItem & { count: number }} />
            );
          })}
        </div>
      )}
    </div>
  )
}

export default CartPage;

/* Författare Linus
* Komponent struktur, samt funktion för rendering av cartStore med hjälp av productCard.

* 
* 
*/ 