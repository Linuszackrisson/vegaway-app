import './App.css';
import { BrowserRouter as Router, Route ,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import About from './pages/AboutPage/About';
import MenuPage from './pages/MenuPage/MenuPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import CartPage from './pages/CartPage/CartPage';

function App() {
  return (
    <Router>
   <div>
      <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/about' element={<About />} />
      <Route path='/menu' element={<MenuPage />} />
      <Route path='/dashboard' element={<DashboardPage />} />
      <Route path='/cart' element={<CartPage />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App

/**
 * Författare Linus
 * App.jsx boiler plate, importer och routes setup.
 */