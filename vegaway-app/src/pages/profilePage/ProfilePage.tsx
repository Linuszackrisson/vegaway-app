// src/pages/ProfilePage/ProfilePage.tsx
import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

const ProfilePage: React.FC = () => {
	const { isAuthenticated, userName } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate("/login");
		}
		// Future implementation for fetching order history will go here
	}, [isAuthenticated, navigate]);

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
