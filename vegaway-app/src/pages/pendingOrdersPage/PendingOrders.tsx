import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api/ordersStaff";
import { Link } from "react-router-dom";
import "./PendingOrders.css";

const PendingOrders: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await fetchOrders("false");
        setPendingOrders(result.orders);
      } catch (err) {
        setError("Kunde inte hämta ordrar.");
      } finally {
        setLoading(false);
      }
    };

    getPendingOrders();
  }, []);

  // Log pendingOrders state whenever it changes
  useEffect(() => {
    console.log("Pending orders:", pendingOrders);
  }, [pendingOrders]); // This useEffect runs whenever pendingOrders changes

  const confirmOrder = (orderId: number) => {
    console.log(`Order ${orderId} confirmed! Isak, do your thing!`);
  };

  if (loading) {
    return <p>Laddar ordrar...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

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
              <Link
                to={`/pending-orders/${order.orderId}`}
                state={{ order }}
                className="no-underline"
              >
                <p>View / Edit</p>
              </Link>
              <p>
                Note:{" "}
                <input
                  type="text"
                  placeholder="Antecking till kocken"
                  defaultValue={order.note || ""}
                />
              </p>
              <button onClick={() => confirmOrder(order.orderId)}>
                Confirm
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingOrders;

/* Författare: Linus
 * Denna filen hanterar pending orders och innehåller funktioner för att hantera ordrar.
 */
