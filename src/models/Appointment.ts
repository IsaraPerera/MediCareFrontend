export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED"
  | "NO_SHOW";

export interface Appointment {
  id: number;
  doctorId: number;
  doctorName: string;
  patientId: number;
  patientName: string;
  appointmentDate: string; // yyyy-MM-dd
  startTime: string; // HH:mm
  status: AppointmentStatus;
  reason?: string;
}

export interface AppointmentRequest {
  doctorId: number;
  patientId: number;
  appointmentDate: string;
  startTime: string;
  reason?: string;
}
