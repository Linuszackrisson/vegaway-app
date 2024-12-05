import { useCartStore } from '../../store/cartStore';
import CartProductCard from '../../components/cartProductCard/CartProductCard';
import { MenuItem } from '../../api/menuApi';
import Underline_06 from '../../assets/Underline_06.svg';
import "./cartPage.css";
function CartPage() {
	const cartItems = useCartStore(state => state.items);
	const uniqueCartItems = Array.from(new Map(cartItems.map(item => [item.menuId, item])).values());
	const totalPrice = useCartStore(state => state.getTotalPrice()).toFixed(2);
	
	return (
		<div className="cartpage wrapper px-1">
			<h1 className="cartpage__title">Your Cart</h1>
			<img src={Underline_06} alt="Cart" className="cartpage__image" />
			{uniqueCartItems.length === 0 ? (
				<p className="cartpage__empty-message">Tom kundvagn, tom mage.</p>
			) : (
				<div className="cartpage__card-container">
					{uniqueCartItems.map(item => {
						const itemCount = cartItems.filter(cartItem => cartItem.menuId === item.menuId).length;
						return (
							<CartProductCard key={item.menuId} item={{ ...item, count: itemCount } as MenuItem & { count: number }} />
						);
					})}
					<div className="cartpage__total-price">
						<h2>Total price: ${totalPrice}</h2>
					</div>
				</div>
			)}
		</div>
	);
}

export default CartPage;

/* Författare Linus
 * Hela komponenten ink alla funktioner och styling, nu ska det fungera som väntat.
 * Implementerade total price och total items.
 *
 */
