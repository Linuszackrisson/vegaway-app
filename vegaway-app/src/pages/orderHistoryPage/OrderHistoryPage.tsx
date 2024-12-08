import { useEffect, useState } from "react";
import { fetchOrderHistory } from "../../api/orderHistory";
import { FetchOrdersResponse, Order } from "../../api/utils/orderInterface";
import OrderHistory from "../../components/orderHistory/OrderHistory";
import "./orderHistoryPage.css";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<Order[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: FetchOrdersResponse = await fetchOrderHistory();

        setOrderHistory(response.orders);
      } catch (err) {
        console.error("error:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="wrapper order-history-page">
      <h1 className="order-history-page__heading px-1">Order History</h1>
      {orderHistory ? (
        <ul className="order-history-page___ul px-1">
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

/* Författare: Isak
 *
 * Sida som hämtar och visar order historik för inloggad kund
 */
