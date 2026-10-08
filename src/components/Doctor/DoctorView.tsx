import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDoctors } from "../../libs/DoctorService";
import { Doctor } from "../../models/Doctor";

const DoctorView = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch(() => setDoctors([]))
      .finally(() => setLoading(false));
  }, []);

  const filtered = doctors.filter(
    (d) =>
      d.fullName.toLowerCase().includes(search.toLowerCase()) ||
      d.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <h3 className="mb-3">Our Doctors</h3>
      <input className="form-control mb-4" placeholder="Search by name or specialization"
        value={search} onChange={(e) => setSearch(e.target.value)} />
      {loading && <p>Loading...</p>}
      <div className="row g-3">
        {filtered.map((d) => (
          <div className="col-md-4" key={d.id}>
            <div className="card card-hover h-100">
              <div className="card-body">
                <h5 className="card-title">Dr. {d.fullName}</h5>
                <h6 className="text-muted">{d.specialization}</h6>
                <p className="mb-1">{d.qualifications}</p>
                <p className="mb-3">Fee: <strong>Rs. {d.consultationFee}</strong></p>
                <Link to={`/doctors/${d.id}/book`} className="btn btn-primary btn-sm">
                  Book appointment
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {!loading && filtered.length === 0 && <p className="text-muted">No doctors found.</p>}
    </div>
  );
};

export default DoctorView;
