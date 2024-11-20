import { testOrder } from "./testCreateOrder";
import { createOrder } from "../../placeOrder";

const TestOrderButton = () => {
  const testCreateOrder = async () => {
    try {
      const response = await createOrder(testOrder);
      console.log("Order created successfully:", response);
      alert("Order created successfully!");
    } catch (error) {
      console.error("Error during order creation:", error);
      alert("Error creating order. Check console for details.");
    }
  };

  return <button onClick={testCreateOrder}>Test Create Order</button>;
};

export default TestOrderButton;

/* 
Författare: Isak

Test knapp för att simulera att man lägger en order
*/
