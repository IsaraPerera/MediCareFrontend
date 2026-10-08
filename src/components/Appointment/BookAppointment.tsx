import { FormEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAvailableSlots, getDoctor } from "../../libs/DoctorService";
import { bookAppointment } from "../../libs/AppointmentService";
import { useAuth } from "../../libs/AuthContext";
import { Doctor } from "../../models/Doctor";

const BookAppointment = () => {
  const { doctorId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (doctorId) getDoctor(Number(doctorId)).then(setDoctor).catch(() => setDoctor(null));
  }, [doctorId]);

  useEffect(() => {
    if (doctorId && date) {
      getAvailableSlots(Number(doctorId), date).then(setSlots).catch(() => setSlots([]));
      setTime("");
    }
  }, [doctorId, date]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user || !doctor) return;
    try {
      // patientId is assumed to equal the logged-in user's id; adjust to your backend
      await bookAppointment({
        doctorId: doctor.id,
        patientId: user.id,
        appointmentDate: date,
        startTime: time,
        reason,
      });
      navigate("/appointments");
    } catch {
      setError("Could not book this slot. Please pick another time.");
    }
  };

  if (!doctor) return <div className="page">Loading...</div>;

  return (
    <div className="page" style={{ maxWidth: 560 }}>
      <h3>Book with Dr. {doctor.fullName}</h3>
      <p className="text-muted">{doctor.specialization}</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <label className="form-label">Date</label>
        <input type="date" className="form-control mb-3" value={date}
          min={new Date().toISOString().split("T")[0]}
          onChange={(e) => setDate(e.target.value)} required />

        <label className="form-label">Available time slots</label>
        <div className="d-flex flex-wrap gap-2 mb-3">
          {slots.map((s) => (
            <button type="button" key={s}
              className={`btn btn-sm ${time === s ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setTime(s)}>
              {s}
            </button>
          ))}
          {date && slots.length === 0 && <span className="text-muted">No slots available.</span>}
        </div>

        <textarea className="form-control mb-3" placeholder="Reason for visit (optional)"
          value={reason} onChange={(e) => setReason(e.target.value)} />
        <button className="btn btn-primary" disabled={!time}>Confirm booking</button>
      </form>
    </div>
  );
};

export default BookAppointment;
