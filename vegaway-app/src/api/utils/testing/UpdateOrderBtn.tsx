import React from "react";

import { updateOrder } from "../../updateOrder";

const UpdateOrderBtn = () => {
  const handleClick = async () => {
    const response = await updateOrder();
    console.log("Update order response:", response);
  };
  return <button onClick={handleClick}>Update your order!</button>;
};

export default UpdateOrderBtn;
