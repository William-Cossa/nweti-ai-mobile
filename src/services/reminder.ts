import { Reminder } from "../../types";
import api from "./api";

export const getReminders = async (childId: string): Promise<Reminder[]> => {
  const response = await api.get(`/reminders/child/${childId}`);
  return response.data;
};

export const createReminder = async (
  reminder: Partial<Reminder>
): Promise<Reminder> => {
  const response = await api.post("/reminders", reminder);
  return response.data;
};

export const updateReminder = async (
  id: string,
  reminder: Partial<Reminder>
): Promise<Reminder> => {
  const response = await api.put(`/reminders/${id}`, reminder);
  return response.data;
};

export const deleteReminder = async (id: string): Promise<void> => {
  await api.delete(`/reminders/${id}`);
};
