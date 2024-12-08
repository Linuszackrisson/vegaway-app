// src/utils/ResetCurrentOrder.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCurrentOrderStore } from "../store/useCurrentOrderStore";

const ResetCurrentOrder: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation();
  const resetOrder = useCurrentOrderStore((state) => state.resetOrder);

  useEffect(() => {
    if (!location.pathname.includes("/order-confirmation")) {
      resetOrder();
    }
  }, [location, resetOrder]);

  return <>{children}</>; // Fragment to avoid extra DOM nodes
};

export default ResetCurrentOrder;

/* Författare: Isak
 *
 * React komponent som används för att nollställa order state i useCurrentOrderStore när URL inte är /order-confirmation.
 */
