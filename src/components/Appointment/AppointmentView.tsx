
import { useCallback, useEffect, useState } from "react";
import {
  cancelAppointment,
  confirmAppointment,
  getDoctorAppointments,
  getPatientAppointments,
} from "../../libs/AppointmentService";
import { useAuth } from "../../libs/AuthContext";
import { Appointment, AppointmentStatus } from "../../models/Appointment";

const statusClass: Record<AppointmentStatus, string> = {
  PENDING: "status-pending",
  CONFIRMED: "status-confirmed",
  COMPLETED: "status-completed",
  CANCELLED: "status-cancelled",
  NO_SHOW: "status-no_show",
};

const AppointmentView = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionId, setActionId] = useState<number | null>(null);

  const load = useCallback(async () => {
    if (!user) {
      setAppointments([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data =
        user.role === "DOCTOR"
          ? await getDoctorAppointments(user.id)
          : await getPatientAppointments(user.id);

      setAppointments(data);
    } catch {
      setError("We couldn't load your appointments. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    void load();
  }, [load]);

  const act = async (
    action: (id: number) => Promise<Appointment>,
    id: number
  ) => {
    setActionId(id);
    setError("");

    try {
      await action(id);
      await load();
    } catch {
      setError("That appointment could not be updated. Please try again.");
    } finally {
      setActionId(null);
    }
  };

  const isDoctor = user?.role === "DOCTOR";

  return (
    <main className="page">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Your schedule</div>
          <h1 className="section-title">
            {isDoctor ? "Appointments" : "My appointments"}
          </h1>
          <p className="section-subtitle">
            {isDoctor
              ? "Review your patients and manage upcoming visits."
              : "View your bookings and keep track of your visits."}
          </p>
        </div>

        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={() => void load()}
          disabled={loading}
        >
          ↻ Refresh
        </button>
      </div>

      <div className="feature-grid mb-4">
        <article className="feature-card">
          <div className="feature-icon">▦</div>
          <div>
            <h3>{appointments.length}</h3>
            <p>Total appointments</p>
          </div>
        </article>

        <article className="feature-card">
          <div className="feature-icon">◷</div>
          <div>
            <h3>
              {appointments.filter((a) => a.status === "PENDING").length}
            </h3>
            <p>Pending confirmation</p>
          </div>
        </article>

        <article className="feature-card">
          <div className="feature-icon">✓</div>
          <div>
            <h3>
              {appointments.filter((a) => a.status === "CONFIRMED").length}
            </h3>
            <p>Confirmed visits</p>
          </div>
        </article>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {loading ? (
        <div className="loading-state">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div>Loading appointments...</div>
        </div>
      ) : appointments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">▦</div>
          <h3>No appointments yet</h3>
          <p>Your appointment list will appear here when bookings are available.</p>
        </div>
      ) : (
        <div className="table-shell">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>{isDoctor ? "Patient" : "Doctor"}</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      <strong>{appointment.appointmentDate}</strong>
                    </td>
                    <td>{appointment.startTime}</td>
                    <td>
                      {isDoctor
                        ? appointment.patientName
                        : `Dr. ${appointment.doctorName}`}
                    </td>
                    <td>{appointment.reason || "General consultation"}</td>
                    <td>
                      <span
                        className={`status-pill ${statusClass[appointment.status]}`}
                      >
                        {appointment.status.replace("_", " ")}
                      </span>
                    </td>
                    <td>
                      <div className="table-actions">
                        {isDoctor && appointment.status === "PENDING" && (
                          <button
                            className="btn btn-primary btn-sm"
                            disabled={actionId === appointment.id}
                            onClick={() =>
                              void act(confirmAppointment, appointment.id)
                            }
                          >
                            Confirm
                          </button>
                        )}

                        {(appointment.status === "PENDING" ||
                          appointment.status === "CONFIRMED") && (
                          <button
                            className="btn btn-outline-danger btn-sm"
                            disabled={actionId === appointment.id}
                            onClick={() =>
                              void act(cancelAppointment, appointment.id)
                            }
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
};

export default AppointmentView;