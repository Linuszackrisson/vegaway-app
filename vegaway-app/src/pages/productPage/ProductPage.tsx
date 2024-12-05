// src/pages/ProductPage/ProductPage.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMenuItems, MenuItem } from '../../api/menuApi';
import { useCartStore } from '../../store/cartStore';
import ProductSlider from '../../components/productSlider/ProductSlider';
import Icon from '../../components/icon/Icon';
import './ProductPage.css';

const ProductPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const [product, setProduct] = useState<MenuItem | null>(null);
	const [relatedProducts, setRelatedProducts] = useState<MenuItem[]>([]);
	const addToCart = useCartStore(state => state.addToCart);

	useEffect(() => {
		const getProduct = async () => {
			const items = await fetchMenuItems();
			const foundProduct = items.find(item => item.menuId === id);
			setProduct(foundProduct || null);
			if (foundProduct) {
				const filteredProducts = items.filter(
					item => item.category === foundProduct.category && item.menuId !== foundProduct.menuId
				);
				setRelatedProducts(filteredProducts);
			}
		};
		getProduct();
	}, [id]);

	const handleAddToCart = () => {
		if (product) {
			addToCart({ ...product, quantity: 1 });
		}
	};

	if (!product) {
		return <p>Product loading...</p>;
	}

	return (
		<div className="product-page wrapper">
			<div className="product-page__image-container">
				<img src={product.imageUrl} alt={product.name} className="product-page__image" />
				<button className="button button--add button--add--large product-page__add-button" onClick={handleAddToCart}>
					<Icon name="Plus" className="icon" />
				</button>
			</div>
			<div className="product-page__info px-2">
				<h1 className="product-page__title">{product.name}</h1>
				<p className="product-page__price">${product.price.toFixed(2)}</p>
			</div>
			<p className="product-page__description px-2">{product.description}</p>
				{relatedProducts.length > 0 && <ProductSlider title="Similar Dishes" items={relatedProducts} />}
		</div>
	);
};

export default ProductPage;

/*
 * Författare: Linus
 * - Komponenten visar information om en enskild produkt baserat på dess ID.
 * - Hämtar och visar relaterade produkter inom samma kategori.
 * - Inkluderar en knapp för att lägga till produkten i varukorgen.
 /
 * Jacob Uppdate:
 * - Använde Icon-komponenten för ikonerna.
 * - Lade till className="button button--add" på "Lägg till"-knappen.
 */
