import React, { useEffect, useState } from 'react';
import './HomePage.css';
import { fetchMenuItems, MenuItem } from '../../api/menuApi';
import ProductSlider from '../../components/productSlider/ProductSlider';
import likeIcon from '../../assets/like.svg';
import instagramIcon from '../../assets/instagram.svg';
import newIcon from '../../assets/new.svg';
import chevronIcon from '../../assets/chevron-right.svg';

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
      
      <div className="button-container">
        <img className='like-icon' src={likeIcon} alt="like"/>
        <button className='button__first ig-white'>We're on Instagram</button>
        <button className='button__first ig-yellow'>
          <img src={instagramIcon} alt="Instagram"/>
          Check us out
          <img src={chevronIcon} alt="Chevron Right"/>
        </button>
      </div>
      <img src={newIcon} alt="newIcon"/>
      {featuredProducts.length > 0 && (
        <ProductSlider title="New Releases" items={featuredProducts} />
      )}
      
    </>
  );
}

export default HomePage;

/**
 * Författare Linus
 * Importerar befintlig ProductSlider
 * Hämtar featured produkter från menuApi
 */