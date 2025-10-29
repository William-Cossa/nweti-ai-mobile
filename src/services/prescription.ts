import { Prescription } from "../../types";
import api from "./api";

export const createPrescription = async (
  prescription: Omit<Prescription, "id" | "isActive">
): Promise<Prescription> => {
  const response = await api.post("/prescriptions", prescription);
  return response.data;
};

export const getPrescriptions = async (): Promise<Prescription[]> => {
  const response = await api.get("/prescriptions");
  return response.data;
};

export const getPrescriptionsByChildId = async (
  childId: string
): Promise<Prescription[]> => {
  const response = await api.get(`/prescriptions/child/${childId}`);
  return response.data;
};

export const getPrescriptionById = async (
  id: string
): Promise<Prescription> => {
  const response = await api.get(`/prescriptions/${id}`);
  return response.data;
};

export const updatePrescription = async (
  id: string,
  prescription: Partial<Prescription>
): Promise<Prescription> => {
  const response = await api.put(`/prescriptions/${id}`, prescription);
  return response.data;
};

export const deletePrescription = async (id: string): Promise<void> => {
  await api.delete(`/prescriptions/${id}`);
};
