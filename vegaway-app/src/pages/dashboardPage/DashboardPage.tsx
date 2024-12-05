// StaffDashboardPage.tsx
import { Link } from "react-router-dom";
import { Clock, Activity, Box, Edit } from "lucide-react";
import "./dashboardPage.css";

const DashboardPage: React.FC = () => {
	return (
		<div className="dashboard staff__wrapper">
			<h1 className="dashboard__heading px-1">Staff</h1>
			<div className="dashboard__buttons px-1">
				<Link to="/pending-orders" className="dashboard__button button--second">
					<div className="dashboard__icon-area dashboard__icon-area--pending">
						<Clock />
					</div>
					<div className="dashboard__text">Pending Orders</div>
				</Link>

				<Link to="/active-orders" className="dashboard__button button--second">
					<div className="dashboard__icon-area dashboard__icon-area--active">
						<Activity />
					</div>
					<div className="dashboard__text">Active Orders</div>
				</Link>
			</div>
		</div>
	);
};

export default DashboardPage;
