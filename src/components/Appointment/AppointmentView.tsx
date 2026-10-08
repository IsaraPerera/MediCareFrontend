import { useCallback, useEffect, useState } from "react";
import {
  cancelAppointment,
  confirmAppointment,
  getDoctorAppointments,
  getPatientAppointments,
} from "../../libs/AppointmentService";
import { useAuth } from "../../libs/AuthContext";
import { Appointment, AppointmentStatus } from "../../models/Appointment";

const badge: Record<AppointmentStatus, string> = {
  PENDING: "warning",
  CONFIRMED: "primary",
  COMPLETED: "success",
  CANCELLED: "danger",
  NO_SHOW: "secondary",
};

const AppointmentView = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const load = useCallback(() => {
    if (!user) return;
    const request =
      user.role === "DOCTOR" ? getDoctorAppointments(user.id) : getPatientAppointments(user.id);
    request.then(setAppointments).catch(() => setAppointments([]));
  }, [user]);

  useEffect(load, [load]);

  const act = async (fn: (id: number) => Promise<Appointment>, id: number) => {
    await fn(id);
    load();
  };

  return (
    <div className="page">
      <h3 className="mb-3">{user?.role === "DOCTOR" ? "Today & Upcoming Appointments" : "My Appointments"}</h3>
      <table className="table table-hover bg-white">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>{user?.role === "DOCTOR" ? "Patient" : "Doctor"}</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.id}>
              <td>{a.appointmentDate}</td>
              <td>{a.startTime}</td>
              <td>{user?.role === "DOCTOR" ? a.patientName : `Dr. ${a.doctorName}`}</td>
              <td><span className={`badge bg-${badge[a.status]}`}>{a.status}</span></td>
              <td className="text-end">
                {user?.role === "DOCTOR" && a.status === "PENDING" && (
                  <button className="btn btn-sm btn-success me-2"
                    onClick={() => act(confirmAppointment, a.id)}>Confirm</button>
                )}
                {(a.status === "PENDING" || a.status === "CONFIRMED") && (
                  <button className="btn btn-sm btn-outline-danger"
                    onClick={() => act(cancelAppointment, a.id)}>Cancel</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {appointments.length === 0 && <p className="text-muted">No appointments yet.</p>}
    </div>
  );
};

export default AppointmentView;
