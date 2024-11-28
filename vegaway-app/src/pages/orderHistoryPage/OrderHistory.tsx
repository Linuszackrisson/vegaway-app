import { useEffect, useState } from "react";
import { fetchOrderHistory } from "../../api/orderHistory";
import { FetchOrdersResponse } from "../../api/utils/orderInterface";

const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState<FetchOrdersResponse | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOrderHistory();
        setOrderHistory(response);
      } catch (err) {
        console.error("error:", err);
      }
    };

    fetchData();
  }, []);

  return <div></div>;
};

export default OrderHistoryPage;
