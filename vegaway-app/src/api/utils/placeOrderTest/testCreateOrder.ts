import { createOrder } from "../../placeOrder";

async function testCreateOrder() {
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
  } catch (error) {
    console.error("Error during order creation:", error);
  }
}

testCreateOrder();
