import api from "./api";
import { Appointment, AppointmentRequest } from "../models/Appointment";

export const bookAppointment = async (data: AppointmentRequest) =>
  (await api.post<Appointment>("/appointments", data)).data;

export const getAppointment = async (id: number) =>
  (await api.get<Appointment>(`/appointments/${id}`)).data;

export const getDoctorAppointments = async (doctorId: number) =>
  (await api.get<Appointment[]>(`/doctors/${doctorId}/appointments`)).data;

export const getPatientAppointments = async (patientId: number) =>
  (await api.get<Appointment[]>(`/patients/${patientId}/appointments`)).data;

export const confirmAppointment = async (id: number) =>
  (await api.put<Appointment>(`/appointments/${id}/confirm`)).data;

export const cancelAppointment = async (id: number) =>
  (await api.put<Appointment>(`/appointments/${id}/cancel`)).data;

export const rescheduleAppointment = async (id: number, appointmentDate: string, startTime: string) =>
  (await api.put<Appointment>(`/appointments/${id}/reschedule`, { appointmentDate, startTime })).data;
