import { vegetarianDishes } from '../../api/mockupData';

const MenuItem = () => {
  return (
    <div>
      {vegetarianDishes.map(dish => (
        <div key={dish.id}>
          <h3>{dish.name}</h3>
          <p>{dish.description}</p>
          <p>Price: ${dish.price.toFixed(2)}</p>
          <p>Ingredients: {dish.ingredients.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default MenuItem;

/**
 * Författare Linus
 * Boiler plate code and folder structure, also added map thru test data from mockupData.ts
 * 
 */