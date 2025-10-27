import { Child } from "../../types";
import api from "./api";

export const createChild = async (childData: Partial<Child>) => {
  const response = await api.post("/children", childData);
  return response.data;
};

export const getAllChildren = async () => {
  const response = await api.get("/children");
  return response.data;
};

export const getChildById = async (id: string) => {
  const response = await api.get(`/children/${id}`);
  return response.data;
};

export const updateChild = async (id: string, childData: Partial<Child>) => {
  const response = await api.put(`/children/${id}`, childData);
  return response.data;
};

export const deleteChild = async (id: string) => {
  const response = await api.delete(`/children/${id}`);
  return response.data;
};
