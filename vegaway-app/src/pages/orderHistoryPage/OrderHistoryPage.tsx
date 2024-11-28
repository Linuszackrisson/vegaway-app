import { useEffect, useState } from "react";
import { fetchOrderHistory } from "../../api/orderHistory";
import { FetchOrdersResponse, Order } from "../../api/utils/orderInterface";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: FetchOrdersResponse = await fetchOrderHistory();
        console.log("Response:", response);

        setOrderHistory(response.orders);
      } catch (err) {
        console.error("error:", err);
      }
    };

    fetchData();
  }, []);

  // Log orderHistory after it updates
  useEffect(() => {
    console.log("Order history state updated:", orderHistory);
  }, [orderHistory]); // This useEffect runs whenever orderHistory changes

  return (
    <div>
      <h1>Order History</h1>
      {orderHistory ? (
        <ul>
          {orderHistory.map((order) => (
            <li key={order.orderId}>
              <div>Order ID: {order.orderId}</div>
              <div>Total Price: {order.totalPrice}</div>
              <div>Is confirmed: {order.isConfirmed}</div>
              <div>
                Order Items:
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      <div>Name: {item.name}</div>
                      <div>Price: {item.price}</div>
                      <div>Category: {item.category}</div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Replace this placeholder with your imported component */}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default OrderHistoryPage;
