import React, { useEffect, useState } from "react";
import { fetchOrders } from "../../api/ordersStaff";
import { Link } from "react-router-dom";
import { confirmOrder } from "../../api/confirmOrderStaff";
import { OrderIdAndNote } from "../../api/confirmOrderStaff";
import { validateNote } from "../../utils/joi";
import { useFeedbackStore } from "../../store/useFeedbackStore";
import "./pendingOrders.css";

const PendingOrders: React.FC = () => {
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const { setMessage, setVisibility } = useFeedbackStore.getState();

  useEffect(() => {
    const getPendingOrders = async () => {
      try {
        const result = await fetchOrders("false");
        setPendingOrders(result.orders);
      } catch (err) {
        setError("Kunde inte hämta ordrar.");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getPendingOrders();
  }, []);

  const handleConfirmation = async (orderId: string) => {
    // Extract note for the order
    const note = notes[orderId] || ""; // Default to empty string if no note

    // Validate the note using JOI
    const validationError = validateNote(note);
    if (validationError) {
      setError(validationError);

      // Trigger feedback component
      setMessage(validationError);
      setVisibility(true);

      return; // Return early to avoid sending request if validation fails
    }

    const orderData: OrderIdAndNote = {
      orderId,
      note,
    };

    // Send the orderData object to the confirmOrder function
    await confirmOrder(orderData);

    // Remove the confirmed order from the list
    setPendingOrders((prevOrders) =>
      prevOrders.filter((order) => order.orderId !== orderId)
    );
  };

  if (loading) {
    return <p>Laddar ordrar...</p>;
  }

  const handleNoteChange = (orderId: string, note: string) => {
    setNotes((prevNotes) => ({ ...prevNotes, [orderId]: note }));
  };

  return (
    <div className="pending-orders wrapper px-1">
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
                to={`/pending-orders/${order.orderId}`}
                state={{ order }}
                className="view-edit"
              >
                <p className="view-edit-p">View / Edit</p>
              </Link>

              <input
                className="chef-note"
                type="text"
                placeholder="Note to chef"
                defaultValue={order.note || ""}
                onChange={(e) =>
                  handleNoteChange(order.orderId, e.target.value)
                }
              />

              <button onClick={() => handleConfirmation(order.orderId)}>
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
 *
 * PendingOrders, visar alla pending orders.
 * Byggd enligt skiss.
 * Använder OrderDetails för att visa ordern i detalj.
 * Möjligt att skriva en note till chefen.
 * Möjliggör att navigera till OrderDetails med view full order.
 */

/* Uppdatering: Isak
 *
 * La funktionalitet på confirm knappen för att markera en order som hanterad
 */

/* Uppdatering: Isak
 *
 * Implementerade joi för att validera user input på note. Förhindrar skadlig input
 */

/* Uppdatering: Isak
 *
 * Tog bort renderingen av error message.
 * Använder istället Feedback komponenten för att rendera meddelande till användaren.
 */

/* Uppdatering: Linus
 *
 * Global och responsiv styling
 */
