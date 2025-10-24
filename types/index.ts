export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: "male" | "female";
  photoUri?: string;
  weight: number;
  height: number;
  medicalNotes?: string;
  createdAt: string;
}

export interface GrowthRecord {
  id: string;
  childId: string;
  date: string;
  weight: number;
  height: number;
  headCircumference?: number;
  notes?: string;
}

export interface Vaccine {
  id: string;
  name: string;
  description: string;
  recommendedAge: string;
  ageInMonths: number;
  utility: string;
  diseases: string[];
  sideEffects: string[];
  contraindications?: string[];
  dosesRequired: number;
}

export interface VaccinationRecord {
  id: string;
  childId: string;
  vaccineId: string;
  vaccineName: string;
  dateAdministered?: string;
  nextDoseDate?: string;
  status: "completed" | "pending" | "overdue";
  notes?: string;
}

export interface Prescription {
  id: string;
  childId: string;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  prescriptionImageUri?: string;
  isActive: boolean;
}

export interface Recommendation {
  id: string;
  childId: string;
  category: "nutrition" | "sleep" | "hygiene" | "activity" | "development";
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  createdAt: string;
}

export interface HealthUnit {
  id: string;
  name: string;
  type: "hospital" | "clinic" | "pharmacy";
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  services: string[];
}

export interface Reminder {
  id: string;
  childId: string;
  title: string;
  description?: string;
  type: "medication" | "appointment" | "vaccination" | "measurement" | "other";
  dateTime: string;
  isCompleted: boolean;
  isRecurring: boolean;
  recurringPattern?: "daily" | "weekly" | "monthly";
  notificationEnabled: boolean;
  createdAt: string;
}
