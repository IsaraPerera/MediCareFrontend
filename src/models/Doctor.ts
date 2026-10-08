export interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
  qualifications: string;
  consultationFee: number;
  availableDays: string[];
  availableFrom: string; // "09:00"
  availableTo: string; // "17:00"
  unavailableDates: string[];
}
