import { useEffect, useState } from 'react';
import { fetchMenuItems, MenuItem } from '../../api/menuApi';
import ProductSlider from '../../components/productSlider/ProductSlider';
import { Instagram, ChevronRight } from 'lucide-react';
import likeIcon from '../../assets/like.svg';
import newIcon from '../../assets/new.svg';
import aboutPink from '../../assets/pink-about.svg';
import { Link } from 'react-router-dom';
import "./homePage.css";
function HomePage() {
	const [featuredProducts, setFeaturedProducts] = useState<MenuItem[]>([]);

	useEffect(() => {
		const loadFeaturedProducts = async () => {
			const items = await fetchMenuItems();
			const featured = items.filter(item => item.category === 'New Releases' || item.price < 10);
			setFeaturedProducts(featured.slice(0, 5));
		};
		loadFeaturedProducts();
	}, []);

	return (
		<>
			<div className="homepage wrapper">
				<div className="homepage-hero">
					<div className="hero-background"></div>
					<div className="button-container">
						<img className="like-icon" src={likeIcon} alt="like" />
						<h1 className="homepage__heading">We're on Instagram</h1>
						<button className="button button--first">
							<Instagram className="button__icon" strokeWidth={1.5} />
							<span className="button__text">Check us out</span>
							<ChevronRight className="button__icon" strokeWidth={1.5} />
						</button>
					</div>
				</div>
				<div className="home-page__slider">
					<img className="new-icon" src={newIcon} alt="newIcon" />

					{featuredProducts.length > 0 && <ProductSlider title="New Releases" items={featuredProducts} />}
				</div>
				<Link to="/contact">
					<img className="pink-button" src={aboutPink} alt="Pink About Button" />
				</Link>
			</div>
		</>
	);
}

export default HomePage;

/**
 * Författare Linus
 * Importerar befintlig ProductSlider
 * All ovanstående kod + css.
 * Hämtar featured produkter från menuApi
 * Fantastisk med snygg design, men en mardröm att implementera.
 * OBS! Filtreringsknapp skall vara en go-to menu istället, skapar issue för detta separata ärende.
 */
