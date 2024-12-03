import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useFeedbackStore } from "../store/useFeedbackStore";

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

  // Get the setter functions from Zustand store
  const { setMessage, setVisibility } = useFeedbackStore.getState();

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

  // Once the isStaff state is set, check if it's false and navigate the user away from this page
  useEffect(() => {
    if (isStaff === false) {
      // Always trigger feedback when isStaff is false
      setMessage("You do not have access to this");
      setVisibility(true);
      console.error(401, "Unauthorized");
      navigate("/");
    }
  }, [isStaff]);

  // If the isStaff state hasn't been determined yet, don't render anything
  if (isStaff === null) {
    return null; // Set a loader here while isStaff is being proccessed
  }

  if (isStaff === false) {
    return null; // Prevent rendering of children for non-staff users
  }

  return <>{children}</>; // Render the protected route's element if the user is a staff member
};

export default ProtectedRoute;

/* 
Författare: Isak

Komponent som skyddar staff routes.
*/
