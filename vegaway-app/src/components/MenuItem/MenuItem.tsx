// vegaway-app/src/components/MenuItem/MenuItem.tsx
import React, { useState } from "react";
import { MenuItem as MenuItemType } from "../../api/menuApi";
import './MenuItem.css'

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  return (
    <li className="menu-item" key={item.menuId}>
        <div className="menu-item__collapsed">
          <div className="menu-item__image-container">
            <img className="menu-item__image--small" src="https://placehold.co/200x115" alt={item.name} />
            <button className="menu-item__add-button">+</button>
          </div>
          <div className="menu-item__info">
            <div className="menu-item__title-price">
              <p className="menu-item__title">{item.name}</p>
              <p className="menu-item__price">${item.price.toFixed(2)}</p>
            </div>
          </div>
        </div>
    </li>
  );
};

export default MenuItem;

/**
 * Författare Linus
 * Boiler plate code, import av menuAPI function.
 * 
 */