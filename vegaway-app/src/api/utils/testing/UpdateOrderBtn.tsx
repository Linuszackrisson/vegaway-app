import { useState } from "react";
import { updateOrder } from "../../updateOrder";

const UpdateOrderBtn = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleClick = async () => {
    try {
      const response = await updateOrder();
      console.log("Update order response:", response);
      setErrorMessage(""); // Clear any previous error message
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Store the error message if an error occurs
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };
  return (
    <div>
      <button onClick={handleClick}>Refresh order status</button>

      {/* Render the error message if it exists */}
      {errorMessage && (
        <div
          style={{
            color: "red",
            fontSize: "16px",
            fontWeight: "bold",
            backgroundColor: "yellow",
            padding: "5px",
            borderRadius: "4px",
            marginTop: "10px",
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateOrderBtn;
