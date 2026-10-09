
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
  const [loadingDoctor, setLoadingDoctor] = useState(true);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const today = new Date();
  const minDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  useEffect(() => {
    let active = true;

    const loadDoctor = async () => {
      setLoadingDoctor(true);

      try {
        if (!doctorId) throw new Error("Missing doctor ID");
        const data = await getDoctor(Number(doctorId));
        if (active) setDoctor(data);
      } catch {
        if (active) setDoctor(null);
      } finally {
        if (active) setLoadingDoctor(false);
      }
    };

    void loadDoctor();

    return () => {
      active = false;
    };
  }, [doctorId]);

  useEffect(() => {
    let active = true;

    const loadSlots = async () => {
      if (!doctorId || !date) {
        setSlots([]);
        setTime("");
        return;
      }

      setLoadingSlots(true);
      setTime("");
      setError("");

      try {
        const data = await getAvailableSlots(Number(doctorId), date);
        if (active) setSlots(data);
      } catch {
        if (active) {
          setSlots([]);
          setError("Could not load available times for this date.");
        }
      } finally {
        if (active) setLoadingSlots(false);
      }
    };

    void loadSlots();

    return () => {
      active = false;
    };
  }, [doctorId, date]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!user || !doctor || !date || !time) {
      setError("Please select a date and an available time.");
      return;
    }

    setSubmitting(true);

    try {
      await bookAppointment({
        doctorId: doctor.id,
        patientId: user.id,
        appointmentDate: date,
        startTime: time,
        reason,
      });

      navigate("/appointments");
    } catch {
      setError("Could not book this slot. It may no longer be available.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingDoctor) {
    return (
      <main className="page">
        <div className="loading-state">Loading doctor details...</div>
      </main>
    );
  }

  if (!doctor) {
    return (
      <main className="page">
        <div className="empty-state">
          <div className="empty-icon">!</div>
          <h3>Doctor not found</h3>
          <p>We couldn't load this doctor's information.</p>
          <button
            className="btn btn-outline-primary"
            onClick={() => navigate("/doctors")}
          >
            Back to doctors
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Schedule your visit</div>
          <h1 className="section-title">Book an appointment</h1>
          <p className="section-subtitle">
            Choose a convenient date and available time.
          </p>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="booking-layout">
        <aside className="doctor-summary">
          <div className="doctor-avatar">
            {doctor.fullName
              .split(" ")
              .filter(Boolean)
              .slice(-2)
              .map((part) => part[0])
              .join("")
              .toUpperCase()}
          </div>

          <div className="section-eyebrow">Your selected doctor</div>
          <h2>Dr. {doctor.fullName}</h2>
          <span className="doctor-specialty">{doctor.specialization}</span>
          <p className="doctor-qualifications mt-2">
            {doctor.qualifications}
          </p>

          <hr />

          <div className="fee-label">Consultation fee</div>
          <div className="fee-value mb-3">
            LKR {Number(doctor.consultationFee).toLocaleString()}
          </div>

          <div className="fee-label">Usual availability</div>
          <strong>
            {doctor.availableFrom} – {doctor.availableTo}
          </strong>

          {doctor.availableDays.length > 0 && (
            <>
              <div className="fee-label mt-3">Available days</div>
              <p className="mb-0">
                {doctor.availableDays
                  .map(
                    (day) =>
                      day.charAt(0) + day.slice(1).toLowerCase()
                  )
                  .join(", ")}
              </p>
            </>
          )}
        </aside>

        <section className="panel">
          <h2 className="h4 mb-1">Visit details</h2>
          <p className="section-subtitle mb-4">
            Select a date to view available appointment times.
          </p>

          <form onSubmit={handleSubmit}>
            <label className="form-label" htmlFor="appointment-date">
              Appointment date
            </label>
            <input
              id="appointment-date"
              type="date"
              className="form-control mb-4"
              value={date}
              min={minDate}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <label className="form-label d-block">
              Available time slots
            </label>

            {!date ? (
              <div className="empty-state mb-4">
                Choose a date first to view available times.
              </div>
            ) : loadingSlots ? (
              <div className="loading-state mb-4">Checking available times...</div>
            ) : slots.length > 0 ? (
              <div className="slot-grid mb-4">
                {slots.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    className={`slot-btn ${time === slot ? "selected" : ""}`}
                    aria-pressed={time === slot}
                    onClick={() => setTime(slot)}
                  >
                    {slot.slice(0, 5)}
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state mb-4">
                No available time slots for this date. Try another day.
              </div>
            )}

            <label className="form-label" htmlFor="appointment-reason">
              Reason for visit
              <span className="form-hint"> (optional)</span>
            </label>
            <textarea
              id="appointment-reason"
              className="form-control mb-4"
              placeholder="Briefly describe the reason for your visit..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              maxLength={1000}
            />

            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={!time || !date || submitting}
            >
              {submitting
                ? "Confirming booking..."
                : time
                ? `Book appointment · ${time.slice(0, 5)}`
                : "Select a time to continue"}
            </button>

            <button
              type="button"
              className="btn btn-light w-100 mt-2"
              onClick={() => navigate("/doctors")}
            >
              Back to doctors
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default BookAppointment;