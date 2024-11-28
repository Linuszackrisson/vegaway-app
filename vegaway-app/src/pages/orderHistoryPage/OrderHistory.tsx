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

  return <div></div>;
};

export default OrderHistoryPage;
