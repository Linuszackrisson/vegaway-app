import { useEffect, useState } from "react";
import { fetchOrders } from "../../api/ordersStaff";
import { Link } from "react-router-dom";
import "./activeOrderspage.css";

const ActiveOrders: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await fetchOrders("true");
        setPendingOrders(result.orders);
        console.log(error);
      } catch (err) {
        setError("Kunde inte hämta ordrar.");
      }
    };

    getPendingOrders();
  }, []);

  return (
    <div className="active-orders wrapper px-1">
      {pendingOrders.length === 0 ? (
        <p>Inga pending ordrar.</p>
      ) : (
        <div className="order-cards">
          {pendingOrders.map((order) => (
            <div className="order-card card" key={order.orderId}>
              <div className="order-card__bundled">
                <h2>
                  {`${order.orderId}`.charAt(0).toUpperCase() +
                    `${order.orderId}`.slice(1)}
                </h2>
                <p>{order.customerEmail}</p>
              </div>

              <Link
                to={`/active-orders/${order.orderId}`}
                state={{ order }}
                className="view-edit"
              >
                <p className="note">View full order</p>
              </Link>
              <div className="chef-note-container">
                <p>Note to chef:</p>
                <p>{order.note}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveOrders;

/* Författare: Linus
 *
 * Sida för kocken att se färdiga ordrar som blivit "confirmed"
 * Byggd enligt skiss.
 * Återanvänder OrderDetails för att visa ordern i detalj.
 * Visar note to chef. som ej går att redigera.
 * Möjliggör att navigera till OrderDetails med view full order.
 */

/* Uppdaterad: Linus
 *
 * Global och responsiv styling
 */
