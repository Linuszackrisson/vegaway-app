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

  // Log pendingOrders state whenever it changes
  useEffect(() => {
    console.log("Pending orders:", pendingOrders);
  }, [pendingOrders]); // This useEffect runs whenever pendingOrders changes

  const handleConfirmation = async (orderId: string) => {
    // Extract note for the order
    const note = notes[orderId] || ""; // Default to empty string if no note
    const orderData: OrderIdAndNote = {
      orderId,
      note,
    };

    // Send the orderData object to the confirmOrder function
    const response = await confirmOrder(orderData);
    console.log("Trying to update order:", response);

    // Remove the confirmed order from the list
    setPendingOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  if (loading) {
    return <p>Laddar ordrar...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleNoteChange = (orderId: string, note: string) => {
    setNotes((prevNotes) => ({ ...prevNotes, [orderId]: note }));
  };

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
              <h2>Note to chef:{order.note}</h2>
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


