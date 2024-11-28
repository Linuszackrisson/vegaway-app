import { useEffect, useState } from "react";
import { fetchOrderHistory } from "../../api/orderHistory";
import { FetchOrdersResponse, Order } from "../../api/utils/orderInterface";
import OrderHistory from "../../components/orderHistory/OrderHistory";
import "./OrderHistoryPage.css";

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
    <div className="wrapper order-history-page">
      <h1 className="order-history-page__heading">Order History</h1>
      {orderHistory ? (
        <ul className="order-history-page___ul">
          {orderHistory.map((order) => (
            <li className="order-history-page__list-item" key={order.orderId}>
              {/* Replace this li with the OrderHistory component */}
              <OrderHistory order={order} />
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
