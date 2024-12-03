import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export interface DecodedTokenGroups {
  "cognito:groups": string[]; // Cognito groups claim
}

// ProtectedRoute component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate(); // Using useNavigate hook for navigation

  // Define the state and effect for checking if the user is in the "Staff" group
  const [isStaff, setIsStaff] = useState<boolean | null>(null);

  useEffect(() => {
    // Fetch the id_token from localStorage
    const idToken = localStorage.getItem("id_token");

    if (idToken) {
      try {
        // Decode the id_token to get the user's groups
        const decoded: DecodedTokenGroups = jwtDecode(idToken);
        const userGroups: string[] = decoded["cognito:groups"] || [];

        // Check if the user is in the "Staff" group
        setIsStaff(userGroups.includes("Staff"));
      } catch (error) {
        console.error("Error decoding token:", error);
        setIsStaff(false); // Default to false if token decoding fails
      }
    } else {
      setIsStaff(false); // If no token is found, assume user is not in the "Staff" group
    }
  }, []);

  // Once the isStaff state is set, check if it's false and navigate away if necessary
  useEffect(() => {
    if (isStaff === false) {
      console.error(401, "Unauthorized");
      navigate("/"); // Redirect to homepage or any other page if not a staff member
    }
  }, [isStaff, navigate]);

  // If the isStaff state hasn't been determined yet, don't render anything
  if (isStaff === null) {
    return null; // Set a loader here while isStaff is being proccessed
  }

  return <>{children}</>; // Render the protected route's element if the user is a staff member
};

export default ProtectedRoute;

/* 
Författare: Isak

Komponent som skyddar staff routes.
*/
