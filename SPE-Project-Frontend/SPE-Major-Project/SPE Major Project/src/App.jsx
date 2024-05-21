import "./App.css";
import { useState } from "react";
import Login from "./pages/login/component/Login.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Agency from "./pages/agency/component/AgencyDashBoard.jsx"
import AgencyDashBoard from "./pages/agency/component/AgencyDashBoard.jsx";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/agency-dashboard" element={<AgencyDashBoard/>}/>
			</Routes>
		</BrowserRouter>
		// <div>
		// 	<Agency />
		// </div>
	);
}

export default App;
