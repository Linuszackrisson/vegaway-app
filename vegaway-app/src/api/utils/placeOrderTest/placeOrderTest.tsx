import { createOrder } from "../../placeOrder";

// Define the testOrder data
const testOrder = {
  orderId: "12345",
  items: [
    { productId: "A1", productName: "Pizza" },
    { productId: "B2", productName: "Burger" },
  ],
  totalPrice: 49.99,
  orderDate: new Date().toISOString(),
};

// Send order to database function
const testCreateOrder = async () => {
  try {
    const response = await createOrder(testOrder);
    console.log("Order created successfully:", response);
  } catch (error) {
    console.error("Error during order creation:", error);
  }
};

// React functional component
const OrderButton: React.FC = () => {
  const handleClick = () => {
    testCreateOrder(); // Trigger the order creation function when the button is clicked
  };

  return (
    <div>
      <button onClick={handleClick}>Create Order</button>
    </div>
  );
};

export default OrderButton;

/* 
Författare: Isak

Test knapp för att lägga en test order
*/
