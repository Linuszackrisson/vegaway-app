import React from "react";

import { updateOrder } from "../../updateOrder";

const UpdateOrderBtn = async () => {
  const handleClick = await updateOrder();
  return <button onClick={handleClick}>Update your order!</button>;
};

export default UpdateOrderBtn;
