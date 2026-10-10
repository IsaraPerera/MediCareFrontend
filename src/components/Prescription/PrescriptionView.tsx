import { useEffect, useState } from "react";
import { getPatientPrescriptions } from "../../libs/PatientService";
import { useAuth } from "../../libs/AuthContext";
import { Prescription } from "../../models/Prescription";

const PrescriptionView = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!user) {
        setPrescriptions([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError("");

      try {
        const data = await getPatientPrescriptions(user.id);
        if (active) setPrescriptions(data);
      } catch {
        if (active) setError("Unable to load prescriptions. Please try again.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void load();
    return () => { active = false; };
  }, [user]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="page">
      <div className="section-heading d-print-none">
        <div>
          <div className="section-eyebrow">Your medication records</div>
          <h1 className="section-title">Prescriptions</h1>
          <p className="section-subtitle">Review and print your prescribed medicines.</p>
        </div>

        <button className="btn btn-outline-primary" onClick={handlePrint}>
          🖨 Print / Save PDF
        </button>
      </div>

      {loading && (
        <div className="loading-state d-print-none">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div>Loading prescription records...</div>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state d-print-none">
          <div className="empty-icon">!</div>
          <h3>Couldn't load prescriptions</h3>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && prescriptions.length === 0 && (
        <div className="empty-state d-print-none">
          <div className="empty-icon">Rx</div>
          <h3>No prescriptions yet</h3>
          <p>Prescriptions from your consultations will appear here when available.</p>
        </div>
      )}

      {!loading &&
        !error &&
        prescriptions.map((prescription) => (
          <article className="prescription-card mb-4" key={prescription.id}>
            <div className="prescription-head d-flex justify-content-between p-3 border-bottom">
              <div>
                <strong>Dr. {prescription.doctorName}</strong>
                <div className="small text-muted">Prescription #{prescription.id}</div>
              </div>
              <div className="text-end">
                <small className="d-block text-muted">Issued on</small>
                <strong>{prescription.date}</strong>
              </div>
            </div>

            <div className="p-3">
              {prescription.items.length === 0 ? (
                <p className="text-muted mb-0">No medicines listed in this prescription.</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Medicine</th>
                        <th>Dosage</th>
                        <th>Frequency</th>
                        <th>Duration</th>
                        <th>Instructions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {prescription.items.map((item, index) => (
                        <tr key={`${prescription.id}-${index}`}>
                          <td><strong>{item.medicineName}</strong></td>
                          <td>{item.dosage}</td>
                          <td>{item.frequency}</td>
                          <td>{item.duration}</td>
                          <td>{item.instructions || "None"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </article>
        ))}
    </main>
  );
};

export default PrescriptionView;