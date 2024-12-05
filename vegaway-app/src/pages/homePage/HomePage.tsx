import { useEffect, useState } from "react";
import { fetchMenuItems, MenuItem } from "../../api/menuApi";
import ProductSlider from "../../components/productSlider/ProductSlider";
import Icon from "../../components/icon/Icon";
import likeIcon from "../../assets/like.svg";
import newIcon from "../../assets/new.svg";
import aboutPink from "../../assets/pink-about.svg";
import { Link } from "react-router-dom";
import "./homePage.css";
function HomePage() {
	const [featuredProducts, setFeaturedProducts] = useState<MenuItem[]>([]);

	useEffect(() => {
		const loadFeaturedProducts = async () => {
			const items = await fetchMenuItems();
			const featured = items.filter(item => item.category === "New Releases" || item.price < 10);
			setFeaturedProducts(featured.slice(0, 6));
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
							<Icon name="Instagram" className="button__icon" />
							<span className="button__text">Check us out</span>
							<Icon name="ChevronRight" className="button__icon" />
						</button>
					</div>
				</div>
				<img className="new-icon" src={newIcon} alt="newIcon" />
				<div className="home-page__slider">
					{featuredProducts.length > 0 && <ProductSlider title="New Releases" items={featuredProducts} />}
				</div>
				<div className="pink-button__container">
					{" "}
					<Link to="/contact">
						<img className="pink-button" src={aboutPink} alt="Pink About Button" />
					</Link>
				</div>
			</div>
		</>
	);
}

export default HomePage;

/**
 * Författare Linus
 * Huvudsidan, visar featured produkter och en knapp till kontakt-sida.
 * Byggd enligt skiss.
 * Ändrade funktionen för att hämta featured produkter, så att den hämtar 6 produkter istället för 5.
 * Navigerar till kontakt-sida med en knapp.
 * 
 * Uppdaterad Jacob: 2024-12-05 med responsiv styling och finslipning.
 */
