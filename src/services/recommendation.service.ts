import { Recommendation } from "@/types";
import api from "./api";

export const getRecommendations = async (
  childId: string
): Promise<Recommendation[]> => {
  const response = await api.get(`/reminders/child/${childId}`);
  return response.data;
};

export const createRecommendation = async (
  reminder: Partial<Recommendation>
): Promise<Recommendation> => {
  const response = await api.post("/reminders", reminder);
  return response.data;
};

export const updateRecommendation = async (
  id: string,
  reminder: Partial<Recommendation>
): Promise<Recommendation> => {
  const response = await api.put(`/reminders/${id}`, reminder);
  return response.data;
};

export const deleteReminder = async (id: string): Promise<void> => {
  await api.delete(`/reminders/${id}`);
};
