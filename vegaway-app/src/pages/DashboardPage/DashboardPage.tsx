// StaffDashboardPage.tsx
import { Link } from "react-router-dom";
import { Clock, Activity, Box, Edit } from "lucide-react";
import "./DashboardPage.css";

const DashboardPage: React.FC = () => {
	return (
		<div className="dashboard staff__wrapper">
			<h1 className="dashboard__heading">Staff</h1>
			<div className="dashboard__buttons">
				<Link to="/pending-orders" className="dashboard__button button__second">
					<div className="dashboard__icon-area dashboard__icon-area--pending">
						<Clock />
					</div>
					<div className="dashboard__text">Pending Orders</div>
				</Link>

				<Link to="/active-orders" className="dashboard__button button__second">
					<div className="dashboard__icon-area dashboard__icon-area--active">
						<Activity />
					</div>
					<div className="dashboard__text">Active Orders</div>
				</Link>

				<Link to="/inventory" className="dashboard__button button__second">
					<div className="dashboard__icon-area dashboard__icon-area--inventory">
						<Box />
					</div>
					<div className="dashboard__text">Inventory</div>
				</Link>

				<Link to="/edit-menu" className="dashboard__button button__second">
					<div className="dashboard__icon-area dashboard__icon-area--edit">
						<Edit />
					</div>
					<div className="dashboard__text">Edit Menu</div>
				</Link>
			</div>
		</div>
	);
};

export default DashboardPage;
