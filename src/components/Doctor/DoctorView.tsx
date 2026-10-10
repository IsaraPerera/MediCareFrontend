import { useEffect, useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import { getDoctors, deleteDoctor, updateDoctorFee } from "../../libs/DoctorService";
import { Doctor } from "../../models/Doctor";
import { useAuth } from "../../libs/AuthContext";

const DoctorView = () => {
  const { user } = useAuth();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Fee Edit Modal State
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [newFee, setNewFee] = useState<number>(0);
  const [updating, setUpdating] = useState(false);

  const isAdmin = user?.role === "ADMIN";

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

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to remove Dr. ${name}?`)) {
      try {
        await deleteDoctor(id);
        await loadDoctors();
      } catch {
        alert("Failed to delete doctor.");
      }
    }
  };

  const handleOpenFeeModal = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setNewFee(doctor.consultationFee);
  };

  const handleSaveFee = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingDoctor) return;
    setUpdating(true);

    try {
      await updateDoctorFee(editingDoctor.id, Number(newFee));
      setEditingDoctor(null);
      await loadDoctors();
    } catch {
      alert("Failed to update fee.");
    } finally {
      setUpdating(false);
    }
  };

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
        <input
          className="form-control"
          placeholder="Search by doctor, specialty or qualification…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {!loading && !error && (
        <div className="doctor-grid mt-4">
          {filtered.map((doctor) => (
            <article className="doctor-card" key={doctor.id}>
              <div className="doctor-avatar">{initials(doctor.fullName)}</div>
              <h2 className="h5 mb-0">Dr. {doctor.fullName}</h2>
              <span className="doctor-specialty">{doctor.specialization}</span>
              <p className="doctor-qualifications">
                {doctor.qualifications || "Qualified medical professional"}
              </p>

              <div className="doctor-bottom border-top pt-3 mt-3">
                <div>
                  <div className="fee-label">Consultation fee</div>
                  <div className="fee-value">
                    LKR {Number(doctor.consultationFee).toLocaleString()}
                  </div>
                </div>

                <div className="d-flex gap-2 align-items-center">
                  {!isAdmin && (
                    <Link
                      to={`/doctors/${doctor.id}/book`}
                      className="btn btn-primary btn-sm"
                    >
                      Book visit →
                    </Link>
                  )}

                  {isAdmin && (
                    <>
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => handleOpenFeeModal(doctor)}
                      >
                        Edit Fee
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(doctor.id, doctor.fullName)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Fee Edit Modal */}
      {editingDoctor && (
        <div
          className="modal d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Edit Fee - Dr. {editingDoctor.fullName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditingDoctor(null)}
                />
              </div>
              <form onSubmit={handleSaveFee}>
                <div className="modal-body">
                  <label className="form-label" htmlFor="consult-fee-input">
                    Consultation Fee (LKR)
                  </label>
                  <input
                    id="consult-fee-input"
                    type="number"
                    step="50"
                    className="form-control"
                    value={newFee}
                    onChange={(e) => setNewFee(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => setEditingDoctor(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={updating}
                  >
                    {updating ? "Saving..." : "Save Fee"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default DoctorView;