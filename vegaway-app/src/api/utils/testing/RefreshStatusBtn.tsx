import { refreshStatus } from "../../refreshStatus";

const RefreshStatusBtn = () => {
  const orderId = "order-1732527529607";

  const handleClick = () => {
    refreshStatus(orderId);
  };
  return <button onClick={handleClick}></button>;
};

export default RefreshStatusBtn;

/* 
Författare: Isak

Test knapp för att se en specifik orders status.
*/
