import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import './CartPage.css';
import ProductCard from '../../components/productCard/ProductCard';

function CartPage() {
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart); 

  useEffect(() => {
    console.log('Current cart:', cartItems);
  }, [cartItems]);
 /* * OBSERVERAR DETTA ÄR TEMPORÄRT JAG VILLE BARA SE EFTER MINA CONSOLE LOGS OM JAG KUNDE RENDERA PÅ SKÄRMEN OCKSÅ!!!!!!!!!!!!!!!!!!!*/
  return (
    <div>
      <h1>Cart Page</h1>
      <button onClick={clearCart}>Clear Cart</button> {/* Lägg till denna rad */}
      {cartItems.length === 0 ? (
        <p>Tom kundvagn, tom mage.</p>
      ) : (
        <div className="card-container">
          {cartItems.map((item) => (
            <ProductCard key={item.menuId} item={item} />
          ))}
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