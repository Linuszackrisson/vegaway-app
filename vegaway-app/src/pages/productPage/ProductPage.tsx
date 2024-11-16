// src/pages/ProductPage/ProductPage.tsx
import { useParams } from "react-router-dom";

const ProductPage: React.FC = () => {
	const { id } = useParams<{ id: string }>();

	const product = {
		id: id || "1",
		name: "Product " + (id || "1"),
		description: "This is a description for Product " + (id || "1"),
		price: 9.99,
	};

	return (
		<div>
			<h1>{product.name}</h1>
			<p>{product.description}</p>
			<p>Pris: ${product.price.toFixed(2)}</p>
		</div>
	);
};

export default ProductPage;

/**
 * Författare Jacob
 */
