import { useState } from "react";

export default function PatientLogin() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const url = "http://localhost:3000/patient/auth/login";

	const handleUsernameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const loginButton = async () => {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		});
		const data = await response.json();
		localStorage.setItem("id", data.id);
		localStorage.setItem("token", data.token);
		localStorage.setItem("role", data.role);
	};

	return (
		<div className="flex flex-col w-fit gap-4">
			<input
				type="text"
				value={username}
				onChange={handleUsernameInput}
				placeholder="Username"
				className="border border-solid border-black p-2"
			/>
			<input
				type="password"
				value={password}
				onChange={handlePasswordInput}
				placeholder="Password"
				className="border border-solid border-black p-2"
			/>
			<button onClick={loginButton} className="bg-gray-300 p-2">
				Login
			</button>
		</div>
	);
}
