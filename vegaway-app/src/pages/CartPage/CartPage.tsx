import { useCartStore } from '../../store/cartStore';
import './CartPage.css';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import { MenuItem } from "../../api/menuApi";
import Underline_06 from '../../assets/Underline_06.svg';

function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const uniqueCartItems = Array.from(new Map(cartItems.map(item => [item.menuId, item])).values());

  return (
    <div className='cartpage'>
      <h1 className='cartpage__title'>Your Cart</h1>
      <img src={Underline_06} alt='Cart' className='cartpage__image' />
      {uniqueCartItems.length === 0 ? (
        <p className='cartpage__empty-message'>Tom kundvagn, tom mage.</p>
      ) : (
        <div className="cartpage__card-container">
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
* Nu försvinner kortet om det är NÖLL
* 
*/ 