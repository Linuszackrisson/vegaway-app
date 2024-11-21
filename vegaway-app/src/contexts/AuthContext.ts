// src/contexts/AuthContext.tsx
import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { getUserInfo, logout as authLogout } from "../utils/auth";

interface AuthContextProps {
	isAuthenticated: boolean;
	userName: string;
	logout: () => void;
	updateAuthState: () => void;
}

interface AuthProviderProps {
	children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
	isAuthenticated: false,
	userName: "User",
	logout: () => {},
	updateAuthState: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [userName, setUserName] = useState("User");

	const updateAuthState = () => {
		const accessToken = localStorage.getItem("access_token");
		if (accessToken) {
			setAuthenticated(true);
			const userInfo = getUserInfo();
			if (userInfo && userInfo.email) {
				setUserName(userInfo.email.split("@")[0]);
			}
		} else {
			setAuthenticated(false);
			setUserName("User");
		}
	};

	useEffect(() => {
		updateAuthState();

		// Listen for changes in localStorage
		const handleStorageChange = () => {
			updateAuthState();
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	const logout = () => {
		authLogout();
		setAuthenticated(false);
		setUserName("User");
	};

	return (
		<AuthContext.Provider
			value=({ isAuthenticated, userName, logout, updateAuthState }})
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
