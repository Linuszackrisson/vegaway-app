// src/components/header/Header.tsx
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";
import { ChevronLeft, Menu, User } from "lucide-react";
import Logo from "../../assets/logo.svg";

interface HeaderProps {
	onMenuClick: () => void;
	isAuthenticated: boolean;
	userName: string;
}

const Header: React.FC<HeaderProps> = ({
	onMenuClick,
	isAuthenticated,
	userName,
}) => {
	const location = useLocation();
	const navigate = useNavigate();

	const isHomePage = location.pathname === "/";

	const handleBack = () => {
		navigate(-1);
	};

	const handleProfileClick = () => {
		if (isAuthenticated) {
			navigate("/profile"); // Adjust to your profile page
		} else {
			navigate("/login"); // Adjust to your login page
		}
	};

	return (
		<header className="header">
			<div className="header-left">
				{isHomePage ? (
					<img src={Logo} alt="Logo" className="logo" />
				) : (
					<ChevronLeft className="icon" onClick={handleBack} />
				)}
			</div>
			<div className="header-right">
				<Menu className="icon" onClick={onMenuClick} />
				<User className="icon" onClick={handleProfileClick} />
			</div>
		</header>
	);
};

export default Header;
