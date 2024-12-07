// src/components/productSlider/ProductSlider.tsx
import { useState, useRef, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import { CircleDollarSign, MoveDown, MoveUp } from "lucide-react";
import { MenuItem } from "../../api/menuApi";
import "./productSlider.css";

interface ProductSliderProps {
  title: string;
  items: MenuItem[];
}

type SortState = "none" | "asc" | "desc";

const ProductSlider: React.FC<ProductSliderProps> = ({ title, items }) => {
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>(items);
  const [sortState, setSortState] = useState<SortState>("none");
  const originalOrder = useRef<MenuItem[]>([]);

  useEffect(() => {
    originalOrder.current = items;
    setFilteredItems(items);
    setSortState("none");
  }, [items]);

  const filterByPrice = () => {
    let newSortState: SortState;
    let sortedItems: MenuItem[];

    switch (sortState) {
      case "none":
        newSortState = "asc";
        sortedItems = [...filteredItems].sort((a, b) => a.price - b.price);
        break;
      case "asc":
        newSortState = "desc";
        sortedItems = [...filteredItems].sort((a, b) => b.price - a.price);
        break;
      case "desc":
        newSortState = "none";
        sortedItems = originalOrder.current;
        break;
      default:
        newSortState = "none";
        sortedItems = originalOrder.current;
    }

    setSortState(newSortState);
    setFilteredItems(sortedItems);
  };

  const renderSortIcon = () => {
    switch (sortState) {
      case "asc":
        return (
          <>
            <MoveDown strokeWidth={1.5} size={20} />
            <CircleDollarSign color="#1B1B1B" size={24} strokeWidth={1.25} />
          </>
        );
      case "desc":
        return (
          <>
            <MoveUp strokeWidth={1.5} size={20} />
            <CircleDollarSign color="#1B1B1B" size={24} strokeWidth={1.25} />
          </>
        );
      case "none":
      default:
        return <CircleDollarSign strokeWidth={1.25} size={24} />;
    }
  };

  return (
    <div className="product-slider">
      <div className="titleToggle-box px-2">
        <h2 className="product-slider__title">{title}</h2>
        <button className="filter-button button__third" onClick={filterByPrice}>
          {renderSortIcon()}
        </button>
      </div>
      <ul className="product-slider__list px-2">
        {filteredItems.map((item) => (
          <ProductCard key={item.menuId} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default ProductSlider;

/* Författare: Jacob
 */

/* Uppdatering: Linus
 *
 * Uppdaterade komponent för att fungera med ändringar i MenuPage
 * Lade till filtrerings-funktion för priser, högst till lägst och vice versa, samt knapp som lyssnar.
 * Lagt till ikoner som ändras beroende på sorteringstillstånd.
 */

/* Uppdaterad: Jacob
 *
 * Uppdaterade filtreringen, ikonerna och lagt till menuId istället för id.
 */
