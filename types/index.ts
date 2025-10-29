export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // opcional no front
  otp?: string;
  otpExpires?: string;
  photoUri?: string;
  address?: string;
  phone?: string;
  role?: string | UserRole;
  createdAt?: string;
}
enum UserRole {
  MOTHER,
  CAREGIVER,
  GESTANTE,
}

export interface Child {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  photoUri?: string;
  weight?: number;
  height?: number;
  medicalNotes?: string;
  createdAt: string;
  userId: string;
}

export interface GrowthRecord {
  id?: string;
  childId: string;
  date?: string;
  weight: number;
  height: number;
  headCircumference?: number;
  notes?: string;
}

export interface Vaccine {
  id: string;
  name: string;
  description?: string;
  recommendedAge: string;
  ageInMonths: number;
  utility?: string;
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
  status: string; // "completed" | "pending" | "overdue" é válido no front
  notes?: string;
  vaccine: Vaccine;
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
  userId: string;
  recommendationMasterId: string;
  childId?: string;
  gestanteId?: string;
  category: string;
  title: string;
  description: string;
  priority: string;
  createdAt: string;
  isRead: boolean;
}

export interface RecommendationMaster {
  id: string;
  category: string;
  title: string;
  description: string;
  minAgeMonths?: number;
  maxAgeMonths?: number;
  minGestWeeks?: number;
  maxGestWeeks?: number;
  triggers: string[];
  priority: string;
}

export interface HealthUnit {
  id: string;
  name: string;
  type: string; // hospital, clinic, pharmacy
  address: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  services: string[];
}

export interface Reminder {
  id: string;
  childId: string;
  title: string;
  description?: string;
  type: string;
  dateTime: string;
  isCompleted: boolean;
  isRecurring: boolean;
  recurringPattern?: string;
  notificationEnabled: boolean;
  createdAt: string;
}
