
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDoctors } from "../../libs/DoctorService";
import { Doctor } from "../../models/Doctor";

const DoctorView = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadDoctors = async () => {
    setLoading(true);
    setError(false);

    try {
      const data = await getDoctors();
      setDoctors(data);
    } catch {
      setDoctors([]);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadDoctors();
  }, []);

  const filtered = doctors.filter((doctor) =>
    `${doctor.fullName} ${doctor.specialization} ${doctor.qualifications}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const initials = (name: string) =>
    name
      .split(" ")
      .filter(Boolean)
      .slice(-2)
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <main className="page">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Meet your care team</div>
          <h1 className="section-title">Find your doctor</h1>
          <p className="section-subtitle">
            Browse our available specialists and book a time that works for you.
          </p>
        </div>

        <div className="form-hint">
          {doctors.length} {doctors.length === 1 ? "doctor" : "doctors"} available
        </div>
      </div>

      <div className="search-wrap">
        <span className="search-symbol" aria-hidden="true">
          ⌕
        </span>
        <input
          className="form-control"
          aria-label="Search doctors"
          placeholder="Search by doctor, specialty or qualification…"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      {loading && (
        <div className="loading-state">
          <div
            className="spinner-border text-primary mb-3"
            role="status"
            aria-label="Loading"
          />
          <div>Finding your care team…</div>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state">
          <div className="empty-icon">!</div>
          <h3>We couldn't load the doctors</h3>
          <p>Please check your connection to MediCare and try again.</p>
          <button className="btn btn-primary" onClick={() => void loadDoctors()}>
            Try again
          </button>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="doctor-grid">
          {filtered.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <div className="doctor-avatar">{initials(doctor.fullName)}</div>

              <h2 className="h5 mb-0">Dr. {doctor.fullName}</h2>
              <span className="doctor-specialty">{doctor.specialization}</span>

              <p className="doctor-qualifications">
                {doctor.qualifications || "Qualified medical professional"}
              </p>

              <div className="doctor-bottom">
                <div>
                  <div className="fee-label">Consultation fee</div>
                  <div className="fee-value">
                    LKR {Number(doctor.consultationFee).toLocaleString()}
                  </div>
                </div>

                <Link
                  to={`/doctors/${doctor.id}/book`}
                  className="btn btn-primary btn-sm"
                >
                  Book visit →
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">⌕</div>
          <h3>{search ? "No matching doctors" : "No doctors available yet"}</h3>
          <p>
            {search
              ? "Try a different name or specialty."
              : "Doctor profiles will appear here once they're available."}
          </p>
          {search && (
            <button
              className="btn btn-outline-primary"
              onClick={() => setSearch("")}
            >
              Clear search
            </button>
          )}
        </div>
      )}
    </main>
  );
};

export default DoctorView;