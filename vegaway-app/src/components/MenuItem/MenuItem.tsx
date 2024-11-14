// vegaway-app/src/components/MenuItem/MenuItem.tsx
import React, { useState } from "react";
import { MenuItem as MenuItemType } from "../../api/menuApi";
import './MenuItem.css'

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <li className="menu-item" key={item.menuId}>
      {isExpanded ? (
        <div className="menu-item__expanded">
          <div className="menu-item__image-container">
            <img className="menu-item__image--large" src="https://placehold.co/350x300" alt={item.name} />
          </div>
          <div className="menu-item__info">
            <p className="menu-item__title">{item.name}</p>
            <p className="menu-item__price">${item.price.toFixed(2)}</p>
            </div>
            <p className="menu-item__desc">{item.description}</p>

          
          <button className="menu-item__close-button" onClick={toggleExpand}>Close</button>
        </div>
      ) : (
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
            <button className="menu-item__info-button" onClick={toggleExpand}>info &gt;</button> {/* Info-knapp längst till vänster */}
          </div>
        </div>
      )}
    </li>
  );
};

export default MenuItem;

/**
 * Författare Linus
 * Boiler plate code, import av menuAPI function.
 * 
 */