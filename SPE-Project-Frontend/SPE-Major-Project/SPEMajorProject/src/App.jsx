import { useState } from "react";
import Login from "./pages/login/component/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agency from "./pages/agency/component/AgencyDashBoard.jsx"
import AgencyDashBoard from "./pages/agency/component/AgencyDashBoard.jsx";
import Packages from "./pages/agency/component/Packages.jsx";
import Agents from "./pages/agency/component/Agents.jsx";
import CustomerDashBoard from "./pages/customer/component/Dashboard.jsx";
import PlanTrip from "./pages/customer/component/PlanTrip.jsx";
import Package from "./pages/customer/component/Package.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/agency-dashboard" element={<AgencyDashBoard/>}/>
				<Route path="/agency/packages" element={<Packages/>}/>
				<Route path="/agency/agents" element={<Agents/>}/>
				<Route path="/customer/dashboard" element={<CustomerDashBoard/>}/>
				<Route path="/customer/plan-trip" element={<PlanTrip/>}/>
				<Route path="/customer/review-package" element={<Package/>}/>
			</Routes>
		</BrowserRouter>
		
	);
}

export default App;
