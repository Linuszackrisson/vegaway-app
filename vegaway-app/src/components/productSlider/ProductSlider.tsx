// src/components/productSlider/ProductSlider.tsx
import { useState, useRef, useEffect } from "react";
import ProductCard from "../productCard/ProductCard";
import Icon from "../icon/Icon";
import { MenuItem } from "../../api/menuApi";
import { Link } from "react-router-dom";
import "./productSlider.css";

interface ProductSliderProps {
	title: string;
	items: MenuItem[];
	pageType: "menu" | "home" | "product";
}

type SortState = "none" | "asc" | "desc";

const ProductSlider: React.FC<ProductSliderProps> = ({ title, items, pageType }) => {
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
						<Icon name="MoveDown" className="button__icon" />
						<Icon name="CircleDollarSign" className="button__icon" />
					</>
				);
			case "desc":
				return (
					<>
						<Icon name="MoveUp" className="button__icon" />
						<Icon name="CircleDollarSign" className="button__icon" />
					</>
				);
			default:
				return <Icon name="CircleDollarSign" className="button__icon" />;
		}
	};

	return (
		<div className="product-slider">
			<div className="titleToggle-box px-2">
				<h2 className="product-slider__title">{title}</h2>
				{pageType === "menu" ? (
					<button className="filter-button button__third" onClick={filterByPrice}>
						{renderSortIcon()}
					</button>
				) : (
					<Link to="/menu" className="filter-button button__third">
						<span className="button__text button-text__see-menu">See full menu</span>
						<Icon name="ChevronRight" className="button__icon" />
					</Link>
				)}
			</div>
			<ul className="product-slider__list px-2">
				{filteredItems.map(item => (
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
/* Uppdaterad: Jacob
 *
 * Lagt till pagetype-prop för att visa prisfiltrering endast på MenuPage.
 * Annars visas "See full menu" länk.
 */
