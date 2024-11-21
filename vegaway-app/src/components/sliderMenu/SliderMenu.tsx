// src/components/sliderMenu/SliderMenu.tsx
import { Link } from "react-router-dom";
import "./SliderMenu.css";
import { ChevronLeft, User, BookOpen, ShoppingBag, Mail } from "lucide-react"; // Import Lucide icons

interface SliderMenuProps {
	isOpen: boolean;
	onClose: () => void;
	isAuthenticated: boolean;
	userName: string;
}

const SliderMenu: React.FC<SliderMenuProps> = ({
	isOpen,
	onClose,
	isAuthenticated,
	userName,
}) => {
	return (
		<div className={`slider-menu ${isOpen ? "open" : ""}`}>
			<div className="menu-header">
				<ChevronLeft className="icon" onClick={onClose} />
			</div>
			<div className="menu-content">
				<div className="profile-section">
					<div className="profile-pic">
						<User className="icon" />
					</div>
					<h2>Welcome{isAuthenticated ? `, ${userName}` : ""}</h2>
					{!isAuthenticated && <p>Login to see your order history</p>}
				</div>
				<nav className="menu-nav">
					<Link to="/menu" onClick={onClose}>
						<BookOpen className="icon" />
						Menu
					</Link>
					{isAuthenticated && (
						<Link to="/orders" onClick={onClose}>
							<ShoppingBag className="icon" />
							Order History
						</Link>
					)}
					<Link to="/contact" onClick={onClose}>
						<Mail className="icon" />
						Contact Us
					</Link>
				</nav>
			</div>
			<div className="menu-footer">
				{/* Graphics */}
				<img src="/path-to-your-graphic.svg" alt="Graphic" />
			</div>
		</div>
	);
};

export default SliderMenu;
