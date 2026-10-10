import api from "./api";
import { Doctor } from "../models/Doctor";

export const getDoctors = async () => (await api.get<Doctor[]>("/doctors")).data;

export const getDoctor = async (id: number) => (await api.get<Doctor>(`/doctors/${id}`)).data;

export const getAvailableSlots = async (doctorId: number, date: string) =>
  (await api.get<string[]>(`/doctors/${doctorId}/slots`, { params: { date } })).data;

export const updateDoctorFee = async (doctorId: number, consultationFee: number) =>
  (await api.put<Doctor>(`/doctors/${doctorId}/fee`, { consultationFee })).data;

export const updateDoctorProfile = async (
  doctorId: number,
  data: Partial<Omit<Doctor, "id" | "fullName" | "unavailableDates">>
) => (await api.put<Doctor>(`/doctors/${doctorId}`, data)).data;

export const deleteDoctor = async (id: number) =>
  (await api.delete(`/doctors/${id}`)).data;