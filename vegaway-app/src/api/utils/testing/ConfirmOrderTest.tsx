import { confirmOrder } from "../../confirmOrderStaff";

const ConfirmOrderButton: React.FC = () => {
  const handleConfirmOrder = async () => {
    const orderId: string = "order-1732556832037";
    const note: string = "This is a test;";

    try {
      const response = await confirmOrder({ orderId, note });
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
