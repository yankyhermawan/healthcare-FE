import { io } from "socket.io-client";
import { useEffect, useState } from "react";

interface Appointment {
	id: string;
	patientId: string;
	doctorId: string;
	createdAt?: Date;
	calledAt?: Date;
	doneAt?: Date;
	reason: string;
	status: string;
}

interface Response {
	code: number;
	response: Appointment;
}

export default function DoctorHome() {
	const userId = localStorage.getItem("id");
	const role = localStorage.getItem("role");
	const [appointmentData, setAppointmentData] = useState<Appointment[]>([]);
	const socket = io(":3000");
	const appointmentURL = "http://localhost:3000/appointment/";

	const fetchInitData = async () => {
		const response = await fetch(appointmentURL + userId);
		const data = await response.json();
		setAppointmentData(data);
	};
	useEffect(() => {
		const data = {
			userId: userId,
			role: role,
		};
		socket.emit("identifyUser", data);
		fetchInitData();
	}, []);

	const callButton = (data: Appointment) => {
		const emitData = {
			id: data.id,
			patientId: data.patientId,
			doctorId: data.doctorId,
		};
		socket.emit("callPatient", emitData);
	};

	const doneButton = (data: Appointment) => {
		const emitData = {
			id: data.id,
			patientId: data.patientId,
			doctorId: data.doctorId,
		};
		socket.emit("patientDone", emitData);
	};

	useEffect(() => {
		socket.on("newAppointment", (data: Response) => {
			setAppointmentData((oldData) => [...oldData, data.response]);
		});
		socket.on("updatedAppointment", (data: Appointment[]) => {
			setAppointmentData(data);
		});
	}, [socket, appointmentData]);
	return (
		<>
			<p>Hello {role}</p>
			<p>Doctor Id: {userId}</p>
			<p className="text-xl">Appointment List</p>
			{appointmentData.map((appointment) => {
				return (
					<div
						key={appointment.id}
						className="border border-solid border-black p-2 w-fit"
					>
						<p>Patient Id: {appointment.patientId}</p>
						<p>Doctor Id : {appointment.doctorId}</p>
						<p>Reason : {appointment.reason}</p>
						<p>Status : {appointment.status}</p>
						<button
							className="border border-black border-solid bg-gray-500 px-4 py-2"
							onClick={() => callButton(appointment)}
						>
							Call
						</button>
						<button
							className="border border-black border-solid bg-gray-500 px-4 py-2"
							onClick={() => doneButton(appointment)}
						>
							Done
						</button>
					</div>
				);
			})}
		</>
	);
}
