
import { FormEvent, useState } from "react";
import { createConsultation } from "../../libs/PatientService";

const initialForm = {
  appointmentId: "",
  symptoms: "",
  diagnosis: "",
  notes: "",
  treatment: "",
  followUpDate: "",
};

const ConsultationView = () => {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await createConsultation({
        ...form,
        appointmentId: Number(form.appointmentId),
        followUpDate: form.followUpDate || undefined,
      });

      setIsError(false);
      setMessage("Consultation saved successfully.");
      setForm(initialForm);
    } catch {
      setIsError(true);
      setMessage(
        "Could not save this consultation. Check the appointment ID and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page">
      <div className="section-heading">
        <div>
          <div className="section-eyebrow">Clinical workspace</div>
          <h1 className="section-title">New consultation</h1>
          <p className="section-subtitle">
            Record the patient's symptoms, diagnosis and treatment plan.
          </p>
        </div>
      </div>

      <section className="panel">
        {message && (
          <div
            className={`alert ${isError ? "alert-danger" : "alert-success"}`}
            role="status"
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="consult-appointment">
              Appointment ID
            </label>
            <input
              id="consult-appointment"
              className="form-control"
              name="appointmentId"
              type="number"
              min="1"
              placeholder="Enter the appointment ID"
              value={form.appointmentId}
              onChange={change}
              required
            />
            <div className="form-hint mt-2">
              Use the ID of the appointment associated with this consultation.
            </div>
          </div>

          <div className="section-eyebrow">Clinical information</div>
          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <label className="form-label" htmlFor="consult-symptoms">
                Symptoms
              </label>
              <textarea
                id="consult-symptoms"
                className="form-control"
                name="symptoms"
                placeholder="Patient-reported symptoms..."
                value={form.symptoms}
                onChange={change}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="consult-diagnosis">
                Diagnosis
              </label>
              <textarea
                id="consult-diagnosis"
                className="form-control"
                name="diagnosis"
                placeholder="Clinical diagnosis..."
                value={form.diagnosis}
                onChange={change}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="consult-notes">
                Clinical notes
              </label>
              <textarea
                id="consult-notes"
                className="form-control"
                name="notes"
                placeholder="Observations and relevant details..."
                value={form.notes}
                onChange={change}
              />
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor="consult-treatment">
                Treatment plan
              </label>
              <textarea
                id="consult-treatment"
                className="form-control"
                name="treatment"
                placeholder="Recommended treatment and care instructions..."
                value={form.treatment}
                onChange={change}
              />
            </div>

            <div className="col-md-6">
              <label className="form-label" htmlFor="consult-followup">
                Follow-up date
              </label>
              <input
                id="consult-followup"
                className="form-control"
                name="followUpDate"
                type="date"
                value={form.followUpDate}
                onChange={change}
              />
            </div>
          </div>

          <div className="d-flex flex-wrap gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Saving consultation..." : "Save consultation"}
            </button>

            <button
              type="button"
              className="btn btn-light"
              onClick={() => {
                setForm(initialForm);
                setMessage("");
              }}
              disabled={loading}
            >
              Clear form
            </button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default ConsultationView;