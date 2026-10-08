import api from "./api";
import { Patient } from "../models/Patient";
import { Prescription, PrescriptionRequest } from "../models/Prescription";
import { Consultation, ConsultationRequest } from "../models/Consultation";

export const getPatients = async () => (await api.get<Patient[]>("/patients")).data;
export const getPatient = async (id: number) => (await api.get<Patient>(`/patients/${id}`)).data;
export const updatePatient = async (id: number, data: Partial<Patient>) =>
  (await api.put<Patient>(`/patients/${id}`, data)).data;

export const getPatientPrescriptions = async (patientId: number) =>
  (await api.get<Prescription[]>(`/patients/${patientId}/prescriptions`)).data;
export const createPrescription = async (data: PrescriptionRequest) =>
  (await api.post<Prescription>("/prescriptions", data)).data;

export const getPatientConsultations = async (patientId: number) =>
  (await api.get<Consultation[]>(`/patients/${patientId}/consultations`)).data;
export const createConsultation = async (data: ConsultationRequest) =>
  (await api.post<Consultation>("/consultations", data)).data;
