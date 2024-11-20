import { confirmOrder } from "../../confirmOrderStaff";

const ConfirmOrderButton: React.FC = () => {
  const handleConfirmOrder = async () => {
    const orderId = "12345";

    try {
      const response = await confirmOrder({ orderId });
      console.log("Order confirmed successfully:", response);
    } catch (error) {
      console.error("Error confirming order:", error);
    }
  };

  return <button onClick={handleConfirmOrder}>Confirm Order</button>;
};

export default ConfirmOrderButton;

/* 
Författare: Isak

Test-knapp för att markera en order som behandlad.
*/
