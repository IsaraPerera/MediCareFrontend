import { FormEvent, useState } from "react";
import { createConsultation } from "../../libs/PatientService";

const ConsultationView = () => {
  const [form, setForm] = useState({
    appointmentId: "",
    symptoms: "",
    diagnosis: "",
    notes: "",
    treatment: "",
    followUpDate: "",
  });
  const [message, setMessage] = useState("");

  const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await createConsultation({
        ...form,
        appointmentId: Number(form.appointmentId),
        followUpDate: form.followUpDate || undefined,
      });
      setMessage("Consultation saved.");
    } catch {
      setMessage("Could not save consultation.");
    }
  };

  return (
    <div className="page" style={{ maxWidth: 640 }}>
      <h3 className="mb-3">New Consultation</h3>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="appointmentId" type="number"
          placeholder="Appointment ID" value={form.appointmentId} onChange={change} required />
        <textarea className="form-control mb-3" name="symptoms" placeholder="Symptoms"
          value={form.symptoms} onChange={change} required />
        <textarea className="form-control mb-3" name="diagnosis" placeholder="Diagnosis"
          value={form.diagnosis} onChange={change} required />
        <textarea className="form-control mb-3" name="notes" placeholder="Doctor's notes"
          value={form.notes} onChange={change} />
        <textarea className="form-control mb-3" name="treatment" placeholder="Treatment"
          value={form.treatment} onChange={change} />
        <label className="form-label">Follow-up date</label>
        <input className="form-control mb-3" name="followUpDate" type="date"
          value={form.followUpDate} onChange={change} />
        <button className="btn btn-primary">Save consultation</button>
      </form>
    </div>
  );
};

export default ConsultationView;
