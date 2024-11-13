import "./MenuPage.css";
import axios from "axios";
import { useEffect, useState } from "react";

const invokeUrl = import.meta.env.VITE_INVOKE_URL;

function MenuPage() {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(`${invokeUrl}/menu`, {
          headers: {
            Authorization: "MY_API_KEY",
          },
        });
        setMenuItems(response.data.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };

    fetchMenu();
  }, []);

  return (
    <div>
      <h1>Menu Page</h1>
      <ul>
        {menuItems.map((item) => (
          <li key={item.menuId}>
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MenuPage;

/**
 * Författare Linus
 * Boiler plate code and folder structure.
 */
