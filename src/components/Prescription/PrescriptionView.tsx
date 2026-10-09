
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

    return () => {
      active = false;
    };
  }, [user]);

  return (
    <main className="page">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Your medication records</div>
          <h1 className="section-title">Prescriptions</h1>
          <p className="section-subtitle">
            Review your prescribed medicines and their instructions.
          </p>
        </div>

        <div className="form-hint">
          {prescriptions.length}{" "}
          {prescriptions.length === 1 ? "prescription" : "prescriptions"}
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div>Loading prescription records...</div>
        </div>
      )}

      {!loading && error && (
        <div className="empty-state">
          <div className="empty-icon">!</div>
          <h3>Couldn't load prescriptions</h3>
          <p>{error}</p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Try again
          </button>
        </div>
      )}

      {!loading && !error && prescriptions.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">Rx</div>
          <h3>No prescriptions yet</h3>
          <p>
            Prescriptions from your consultations will appear here when
            available.
          </p>
        </div>
      )}

      {!loading &&
        !error &&
        prescriptions.map((prescription) => (
          <article className="prescription-card" key={prescription.id}>
            <div className="prescription-head">
              <div>
                <strong>Dr. {prescription.doctorName}</strong>
                <small>Prescription #{prescription.id}</small>
              </div>
              <div className="text-end">
                <small>Issued on</small>
                <strong>{prescription.date}</strong>
              </div>
            </div>

            <div className="p-3 p-md-4">
              {prescription.items.length === 0 ? (
                <p className="text-muted mb-0">
                  No medicines are listed in this prescription.
                </p>
              ) : (
                <div className="table-shell">
                  <div className="table-responsive">
                    <table className="table table-hover">
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
                            <td>
                              <strong>{item.medicineName}</strong>
                            </td>
                            <td>{item.dosage}</td>
                            <td>{item.frequency}</td>
                            <td>{item.duration}</td>
                            <td>{item.instructions || "No additional instructions"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
    </main>
  );
};

export default PrescriptionView;