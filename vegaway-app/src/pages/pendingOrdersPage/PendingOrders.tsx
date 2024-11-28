import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api/ordersStaff"; // Importera funktionen för att hämta ordrar
import "./PendingOrders.css"; // Importera CSS för styling
import { Link } from "react-router-dom"; // Importera Link för navigering

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

  const confirmOrder = (orderId: number) => {
    console.log(`Order ${orderId} confirmed! Isak, do you your thing!`);
  };

  if (loading) {
    return <p>Laddar ordrar...</p>; 
  }

  if (error) {
    return <p>{error}</p>; 
  }

  return (
    <div className="pending-orders">
      {pendingOrders.length === 0 ? (
        <p>Inga pending ordrar.</p> 
      ) : (
        <div className="order-cards">
          {pendingOrders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <h2>Order ID {order.orderId}</h2>
              <Link to={`/pending-orders/${order.orderId}`}>Edit</Link> 
              <p>Status: {order.isConfirmed ? "Confirmed" : "Open"}</p>
              <p>Note: <input type="text" placeholder="Fyll i anteckning" defaultValue={order.note || ""} /></p> {/* Textinmatning för anteckning */}
              <button onClick={() => confirmOrder(order.orderId)}>Confirm</button>
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