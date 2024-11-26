import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { fetchMenuItems, MenuItem } from '../../api/menuApi';
import ProductSlider from '../../components/productSlider/ProductSlider';
import likeIcon from '../../assets/like.svg';
import instagramIcon from '../../assets/instagram.svg';
import newIcon from '../../assets/new.svg';
import chevronIcon from '../../assets/chevron-right2.svg';
import aboutPink from '../../assets/pink-about.svg';

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
        <img className='like-icon' src={likeIcon} alt="like"/>
        <button className='button__first ig-white'> <p>We're on Instagram</p></button>
        <button className='button__first ig-yellow'>
          <img src={instagramIcon} alt="Instagram"/>
          <p>Check us out</p>
          <img src={chevronIcon} alt="Chevron Right"/>
        </button>
        </div>

      
      </div>
      <div className="home-page__slider">
      <img className='new-icon' src={newIcon} alt="newIcon"/>

      {featuredProducts.length > 0 && (
        <ProductSlider title="New Releases" items={featuredProducts} />
      )}
      </div>
      <img className='pink-button' src={aboutPink} alt="Pink About Button"/>

      </div>
    </>
  );
}

export default HomePage;

/**
 * Författare Linus
 * Importerar befintlig ProductSlider
 * Hämtar featured produkter från menuApi
 * Fantastisk med snygg design, men en mardröm att implementera.
 * OBS! Filtreringsknapp skall vara en go-to menu istället, skapar issue för detta separata ärende.
 */