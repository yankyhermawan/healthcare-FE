import { useEffect, useState } from "react";
import { io } from "socket.io-client";

interface DoctorData {
	hospital: string;
	id: string;
	imageURL: string;
	name: string;
	specialization: string;
	username: string;
}

export default function PatientHome() {
	const socket = io(":3000");
	const role = localStorage.getItem("role");
	const patientId = localStorage.getItem("id");

	const [allDoctor, setAllDoctor] = useState<DoctorData[]>([]);
	const [appointmentData, setAppointmentData] = useState({
		doctorId: "",
		patientId: patientId,
		reason: "",
	});
	const [notification, setNotification] = useState<string[]>([]);
	const [currentQueue, setCurrentQueue] = useState(0);
	const [myQueue, setMyQueue] = useState(0);
	const getDoctor = async () => {
		const response = await fetch(
			"http://localhost:3000/doctor?hospital=rumah%20sakit%20umum"
		);
		const data = await response.json();
		setAllDoctor(data);
	};

	const setReason = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAppointmentData({
			...appointmentData,
			[e.target.name]: e.target.value,
		});
	};

	const setDoctor = (value: string) => {
		setAppointmentData({
			...appointmentData,
			doctorId: value,
		});
	};

	useEffect(() => {
		getDoctor();
		const data = {
			userId: patientId,
			role: role,
		};
		socket.emit("identifyUser", data);
		socket.emit("getQueue", {
			doctorId: "7432ff50-9295-446a-b8c3-986f39bb6597",
			patientId: patientId,
		});
		socket.emit("currentQueue", {
			doctorId: "7432ff50-9295-446a-b8c3-986f39bb6597",
			patientId: patientId,
		});
	}, []);

	useEffect(() => {
		socket.on("getQueue", (data: { queueNumber: number }) => {
			setMyQueue(data.queueNumber);
		});
		socket.on("notification", (text: string) => {
			setNotification((notif) => [...notif, text]);
		});
		socket.on("currentQueue", (num: number) => {
			setCurrentQueue(num);
		});
	}, [socket]);

	const submitAppointment = () => {
		socket.emit("newAppointment", appointmentData);
	};
	return (
		<>
			<p>Hello {role}</p>
			<p>Patient Id: {patientId}</p>
			<div className="flex flex-row">
				<div>
					<p className="text-xl">Create Appointment</p>
					<div>
						{allDoctor.map((data) => {
							return (
								<div
									key={data.id}
									className="border border-black border-solid w-fit"
								>
									<p>{data.name}</p>
									<p>{data.specialization}</p>
									<button
										className="bg-gray-300 rounded-lg px-4 py-2"
										value={data.id}
										onClick={() => {
											setDoctor(data.id);
										}}
									>
										Select
									</button>
								</div>
							);
						})}
						<div>
							<p>Alasan:</p>
							<input
								type="text"
								name="reason"
								value={appointmentData.reason}
								onChange={setReason}
								className="border border-solid border-black"
							/>
							<button
								className=" bg-gray-300 rounded-lg"
								onClick={submitAppointment}
							>
								Daftar
							</button>
						</div>
					</div>
				</div>
				<div>
					<div>Current Queue: {currentQueue}</div>
					<div>Your Queue: {myQueue}</div>
				</div>
			</div>
			<div className="mt-6">
				<p>Notifikasi:</p>
				{notification.map((notif, id) => {
					return (
						<div key={id}>
							<p>{notif}</p>
						</div>
					);
				})}
			</div>
		</>
	);
}
