import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DoctorLogin from "./DoctorLogin";
import DoctorRegister from "./DoctorRegister";
import DoctorHome from "./DoctorHome";
import PatientRegister from "./PatientRegister";
import PatientLogin from "./PatientLogin";
import PatientHome from "./PatientHome";
import "./index.css";
export default function App() {
	return (
		<Router>
			<Routes>
				<Route path="/doctor/login" Component={DoctorLogin} />
				<Route path="/doctor/register" Component={DoctorRegister} />
				<Route path="/doctor/home" Component={DoctorHome} />
				<Route path="/patient/register" Component={PatientRegister} />
				<Route path="/patient/login" Component={PatientLogin} />
				<Route path="/patient/home" Component={PatientHome} />
			</Routes>
		</Router>
	);
}
