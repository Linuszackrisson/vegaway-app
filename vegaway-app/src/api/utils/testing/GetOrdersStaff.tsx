import { fetchOrders } from "../../ordersStaff";

const GetOrdersStaff = () => {
  const handleClickTrue = async () => {
    const result = await fetchOrders("true");
    console.log("Confirmed orders:", result);
  };

  const handleClickFalse = async () => {
    const result = await fetchOrders("false");
    console.log("Pending orders:", result);
  };

  return (
    <>
      <button onClick={handleClickTrue}>Get confirmed orders</button>
      <button onClick={handleClickFalse}>Get pending orders</button>
    </>
  );
};

export default GetOrdersStaff;

/* Författare: Isak
 *
 * Testknapp för att hämta ordrar som staff
 */
