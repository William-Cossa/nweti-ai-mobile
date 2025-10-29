import { VaccinationRecord } from "../../types";
import api from "./api";

export const getVaccinationRecords = async (
  childId: string
): Promise<VaccinationRecord[]> => {
  const response = await api.get(`/vaccination-records/${childId}`);
  return response.data;
};

export const updateVaccinationRecord = async (
  id: string,
  record: Partial<VaccinationRecord>
): Promise<VaccinationRecord> => {
  const response = await api.put(`/vaccination-records/${id}`, record);
  return response.data;
};
