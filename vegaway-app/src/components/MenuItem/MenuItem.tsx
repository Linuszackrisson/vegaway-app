import React from "react";
import { MenuItem as MenuItemType } from "../../api/menuApi";

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <li key={item.menuId}>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
    </li>
  );
};

export default MenuItem;

/**
 * Författare Linus
 * Boiler plate code, import av menuAPI function.
 * 
 */