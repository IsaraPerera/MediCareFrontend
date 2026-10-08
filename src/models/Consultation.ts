export interface Consultation {
  id: number;
  appointmentId: number;
  patientName: string;
  doctorName: string;
  symptoms: string;
  diagnosis: string;
  notes: string;
  treatment: string;
  followUpDate?: string;
  createdAt: string;
}

export type ConsultationRequest = Omit<Consultation, "id" | "patientName" | "doctorName" | "createdAt">;
