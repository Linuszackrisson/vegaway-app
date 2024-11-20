import { confirmOrder } from "../../confirmOrderStaff"; // Adjust the import path if needed

const ConfirmOrderButton: React.FC = () => {
  const handleConfirmOrder = async () => {
    const orderId = "12345"; // The orderId to be confirmed

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
