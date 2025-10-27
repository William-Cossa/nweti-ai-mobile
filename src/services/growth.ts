import { GrowthRecord } from "../../types";
import api from "./api";

export const getGrowthRecords = async (
  childId: string
): Promise<GrowthRecord[]> => {
  const response = await api.get(`/growth/child/${childId}`);
  return response.data;
};

export const addGrowthRecord = async (
  childId: string,
  record: Partial<GrowthRecord>
): Promise<GrowthRecord> => {
  const response = await api.post(`/growth`, { childId, ...record });
  return response.data;
};
