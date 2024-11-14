import "./MenuPage.css";
import { useEffect, useState } from "react";
import { fetchMenuItems, MenuItem as MenuItemType } from "../../api/menuApi";
import MenuItem from "../../components/MenuItem/MenuItem";

function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    const getMenuItems = async () => {
      const items = await fetchMenuItems();
      setMenuItems(items);
    };

    getMenuItems();
  }, []);

  return (
    <div>
      <h1>Menu Page</h1>
      <div className="MenuPage-grid">
        {menuItems.length > 0 ? (
          menuItems.map((item) => <MenuItem key={item.menuId} item={item} />)
        ) : (
          <p>Inga menyobjekt tillgängliga, kolla api anropet.</p>
        )}
      </div>
    </div>
  );
}

export default MenuPage;

/**
 * Författare Linus
 * Boiler plate code and folder structure.
 * MenuPage, hämtar och visar en lista av menyobjekt från ett API.
 */
