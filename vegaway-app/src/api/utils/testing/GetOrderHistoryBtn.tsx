import React from "react";
import { fetchOrderHistory } from "../../orderHistory";

const GetOrderHistoryBtn = () => {
  const handleClick = async () => {
    const result = await fetchOrderHistory();
    console.log("Order History:", result);
  };

  return <button onClick={handleClick}>Fetch your order history!</button>;
};

export default GetOrderHistoryBtn;
