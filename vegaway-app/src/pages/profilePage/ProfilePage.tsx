// src/pages/ProfilePage/ProfilePage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./ProfilePage.css";

interface DecodedToken {
	exp: number;
	email: string;
}

const ProfilePage: React.FC = () => {
	const [userName, setUserName] = useState("User");
	const navigate = useNavigate();

	useEffect(() => {
		const idToken = localStorage.getItem("id_token");
		if (idToken) {
			try {
				const decodedToken = jwtDecode<DecodedToken>(idToken);
				const currentTime = Math.floor(Date.now() / 1000);

				if (decodedToken.exp > currentTime) {
					setUserName(decodedToken.email.split("@")[0]);
				} else {
					// Ta bort utgånget token och omdirigera till login
					localStorage.removeItem("id_token");
					navigate("/login");
				}
			} catch (error) {
				console.error("Failed to decode token:", error);
				navigate("/login");
			}
		} else {
			navigate("/login");
		}
	}, [navigate]);

	return (
		<div className="profile-page">
			<h1>Welcome, {userName}</h1>
			<h2>Your Order History</h2>
			{/* Order history will be displayed here when implemented */}
			<p>You have no orders yet.</p>
		</div>
	);
};

export default ProfilePage;
