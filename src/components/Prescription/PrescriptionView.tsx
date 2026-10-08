import { useEffect, useState } from "react";
import { getPatientPrescriptions } from "../../libs/PatientService";
import { useAuth } from "../../libs/AuthContext";
import { Prescription } from "../../models/Prescription";

const PrescriptionView = () => {
  const { user } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);

  useEffect(() => {
    if (user) {
      getPatientPrescriptions(user.id).then(setPrescriptions).catch(() => setPrescriptions([]));
    }
  }, [user]);

  return (
    <div className="page">
      <h3 className="mb-3">Prescriptions</h3>
      {prescriptions.map((p) => (
        <div className="card mb-3" key={p.id}>
          <div className="card-header d-flex justify-content-between">
            <span>Dr. {p.doctorName}</span>
            <span className="text-muted">{p.date}</span>
          </div>
          <table className="table mb-0">
            <thead>
              <tr><th>Medicine</th><th>Dosage</th><th>Frequency</th><th>Duration</th><th>Instructions</th></tr>
            </thead>
            <tbody>
              {p.items.map((i, idx) => (
                <tr key={idx}>
                  <td>{i.medicineName}</td>
                  <td>{i.dosage}</td>
                  <td>{i.frequency}</td>
                  <td>{i.duration}</td>
                  <td>{i.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      {prescriptions.length === 0 && <p className="text-muted">No prescriptions found.</p>}
    </div>
  );
};

export default PrescriptionView;
