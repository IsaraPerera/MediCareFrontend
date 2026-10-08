import api from "./api";
import { Doctor } from "../models/Doctor";

export const getDoctors = async () => (await api.get<Doctor[]>("/doctors")).data;
export const getDoctor = async (id: number) => (await api.get<Doctor>(`/doctors/${id}`)).data;
export const getAvailableSlots = async (doctorId: number, date: string) =>
  (await api.get<string[]>(`/doctors/${doctorId}/slots`, { params: { date } })).data;
