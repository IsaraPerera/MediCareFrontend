export interface PrescriptionItem {
  medicineName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: number;
  patientId: number;
  patientName: string;
  doctorName: string;
  date: string;
  items: PrescriptionItem[];
}

export interface PrescriptionRequest {
  patientId: number;
  consultationId?: number;
  items: PrescriptionItem[];
}
