import { createOrder } from "../../placeOrder";

const TestOrderButton = () => {
  const testCreateOrder = async () => {
    try {
      const testOrder = {
        items: [
          { productId: "123", name: "Pizza" },
          { productId: "456", name: "Burger" },
        ],
        price: 49.99,
      };

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
