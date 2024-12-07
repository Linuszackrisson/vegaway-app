import { refreshStatus } from "../../refreshStatus";

const RefreshStatusBtn = () => {
  const orderId = "order-1732408284436";

  const handleClick = async () => {
    const response = await refreshStatus(orderId);
    console.log(response);
  };
  return <button onClick={handleClick}>Refresh order status</button>;
};

export default RefreshStatusBtn;

/* Författare: Isak
 *
 * Test knapp för att se en specifik orders status.
 */
