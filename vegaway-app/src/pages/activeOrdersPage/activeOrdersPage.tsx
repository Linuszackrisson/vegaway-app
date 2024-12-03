import React, { useEffect, useState } from "react";
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
      } catch (err) {
        setError("Kunde inte hämta ordrar.");
      }
    };

    getPendingOrders();
  }, []);



  return (
    <div className="pending-orders wrapper px-1">
      {pendingOrders.length === 0 ? (
        <p>Inga pending ordrar.</p>
      ) : (
        <div className="order-cards">
          {pendingOrders.map((order) => (
            <div className="order-card card" key={order.orderId}>
              <h2>
                {`${order.orderId}`.charAt(0).toUpperCase() +
                  `${order.orderId}`.slice(1)}
              </h2>
              <Link
                to={`/pending-orders/${order.orderId}`}
                state={{ order }}
                className="view-edit"
              >
                <p className="note">View full order</p>
              </Link>
              <div className="chef-note-container">
                <p>Note to chef:</p>
                <p>{order.note}</p></div>
              
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveOrders;

/* Författare: Linus
 * Denna filen hanterar färdiga ordrar för kocken
 */



