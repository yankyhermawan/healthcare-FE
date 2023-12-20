import { useState } from "react";
export default function DoctorRegister() {
	const [registerData, setRegisterData] = useState({
		username: "",
		password: "",
		name: "",
		specialization: "",
		imageURL: "",
		hospital: "",
	});
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegisterData({
			...registerData,
			[e.target.name]: e.target.value,
		});
	};

	const handleButton = async () => {
		const response = await fetch("http://localhost:3000/doctor/auth/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(registerData),
		});
		console.log(await response.json());
	};

	return (
		<div className="flex flex-col w-fit gap-4">
			<input
				type="text"
				value={registerData.username}
				name="username"
				onChange={handleChange}
				placeholder="Username"
				className="border border-solid border-black p-2"
			/>
			<input
				type="password"
				value={registerData.password}
				name="password"
				onChange={handleChange}
				placeholder="Password"
				className="border border-solid border-black p-2"
			/>
			<input
				type="text"
				value={registerData.name}
				name="name"
				onChange={handleChange}
				placeholder="Name"
				className="border border-solid border-black p-2"
			/>
			<input
				type="text"
				value={registerData.specialization}
				name="specialization"
				onChange={handleChange}
				placeholder="Specialization"
				className="border border-solid border-black p-2"
			/>
			<input
				type="text"
				value={registerData.imageURL}
				name="imageURL"
				onChange={handleChange}
				placeholder="imageURL"
				className="border border-solid border-black p-2"
			/>
			<input
				type="text"
				value={registerData.hospital}
				name="hospital"
				onChange={handleChange}
				placeholder="Hospital"
				className="border border-solid border-black p-2"
			/>
			<button onClick={handleButton} className="bg-gray-300 p-2">
				Register
			</button>
		</div>
	);
}
