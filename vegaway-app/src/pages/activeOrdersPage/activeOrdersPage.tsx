import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api/ordersStaff";
import { Link } from "react-router-dom";
import "./activeOrderspage.css";
import { confirmOrder } from "../../api/confirmOrderStaff";
import { OrderIdAndNote } from "../../api/confirmOrderStaff";

const ActiveOrders: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await fetchOrders("true");
        setPendingOrders(result.orders);
      } catch (err) {
        setError("Kunde inte hämta ordrar.");
      } finally {
        setLoading(false);
      }
    };

    getPendingOrders();
  }, []);


  return (
    <div className="pending-orders wrapper">
      {pendingOrders.length === 0 ? (
        <p>Inga pending ordrar.</p>
      ) : (
        <div className="order-cards">
          {pendingOrders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <h2>
                {`${order.orderId}`.charAt(0).toUpperCase() +
                  `${order.orderId}`.slice(1)}
              </h2>
              <div className="chef-note-container">
              <h2>Note to chef:</h2><p>{order.note}</p></div>
              <Link
                to={`/pending-orders/${order.orderId}`}
                state={{ order }}
                className="no-underline"
              >
                <p>View full order</p>
              </Link>    
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveOrders;

/* Författare: Linus
 * Denna filen hanterar active orders för kocken, dvs ordrar som behöver bekräftas av staff.
 * Innehåller en note från staff
 * Fun fact: Denna filen är helt identisk med pendingOrdersPage, men denna filen hanterar bara bekräftade ordrar.
 */


