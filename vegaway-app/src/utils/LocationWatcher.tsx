import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useLoggedInStore from "../store/useLoggedInStore";

function LocationWatcher() {
  const location = useLocation();
  const updateLoginState = useLoggedInStore((state) => state.updateLoginState);

  useEffect(() => {
    updateLoginState();
  }, [location]);

  return null;
}

export default LocationWatcher;

/* 
Författare: Isak

Komponent som använder updateLoginState för att se om en användare är inloggad baserat på tokens i local storage.
Om tokens är expired så rensas local storage på sparad data.
*/
