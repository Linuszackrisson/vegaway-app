// src/contexts/MenuContext.tsx
import { createContext, useState, useContext, ReactNode } from "react";

interface MenuContextProps {
	isMenuOpen: boolean;
	openMenu: () => void;
	closeMenu: () => void;
}

interface MenuProviderProps {
	children: ReactNode;
}

const MenuContext = createContext<MenuContextProps>({
	isMenuOpen: false,
	openMenu: () => {},
	closeMenu: () => {},
});

export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const openMenu = () => setIsMenuOpen(true);

	const closeMenu = () => setIsMenuOpen(false);

	return (
		<MenuContext.Provider value={{ isMenuOpen, openMenu, closeMenu }}>
			{children}
		</MenuContext.Provider>
	);
};

export const useMenu = () => useContext(MenuContext);
