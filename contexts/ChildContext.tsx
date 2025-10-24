import {
  Child,
  GrowthRecord,
  Prescription,
  Recommendation,
  Reminder,
  VaccinationRecord,
} from "@/types";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEYS = {
  CHILDREN: "@health_app_children",
  GROWTH_RECORDS: "@health_app_growth",
  VACCINATIONS: "@health_app_vaccinations",
  PRESCRIPTIONS: "@health_app_prescriptions",
  RECOMMENDATIONS: "@health_app_recommendations",
  REMINDERS: "@health_app_reminders",
};

export const [ChildProvider, useChild] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const childrenQuery = useQuery({
    queryKey: ["children"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.CHILDREN);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const growthQuery = useQuery({
    queryKey: ["growth"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.GROWTH_RECORDS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const vaccinationsQuery = useQuery({
    queryKey: ["vaccinations"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.VACCINATIONS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const prescriptionsQuery = useQuery({
    queryKey: ["prescriptions"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.PRESCRIPTIONS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const recommendationsQuery = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const remindersQuery = useQuery({
    queryKey: ["reminders"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.REMINDERS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const children = useMemo(
    () => childrenQuery.data || [],
    [childrenQuery.data]
  );
  const growthRecords = useMemo(
    () => growthQuery.data || [],
    [growthQuery.data]
  );
  const vaccinations = useMemo(
    () => vaccinationsQuery.data || [],
    [vaccinationsQuery.data]
  );
  const prescriptions = useMemo(
    () => prescriptionsQuery.data || [],
    [prescriptionsQuery.data]
  );
  const recommendations = useMemo(
    () => recommendationsQuery.data || [],
    [recommendationsQuery.data]
  );
  const reminders = useMemo(
    () => remindersQuery.data || [],
    [remindersQuery.data]
  );

  const selectedChild =
    children.find((c: Child) => c.id === selectedChildId) || children[0];

  useEffect(() => {
    if (children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  const addChildMutation = useMutation({
    mutationFn: async (child: Child) => {
      const updated = [...children, child];
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHILDREN,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const updateChildMutation = useMutation({
    mutationFn: async (child: Child) => {
      const updated = children.map((c: Child) =>
        c.id === child.id ? child : c
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.CHILDREN,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const addGrowthRecordMutation = useMutation({
    mutationFn: async (record: GrowthRecord) => {
      const updated = [...growthRecords, record];
      await AsyncStorage.setItem(
        STORAGE_KEYS.GROWTH_RECORDS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["growth"] });
    },
  });

  const addVaccinationMutation = useMutation({
    mutationFn: async (vaccination: VaccinationRecord) => {
      const updated = [...vaccinations, vaccination];
      await AsyncStorage.setItem(
        STORAGE_KEYS.VACCINATIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
    },
  });

  const updateVaccinationMutation = useMutation({
    mutationFn: async (vaccination: VaccinationRecord) => {
      const updated = vaccinations.map((v: VaccinationRecord) =>
        v.id === vaccination.id ? vaccination : v
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.VACCINATIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vaccinations"] });
    },
  });

  const addPrescriptionMutation = useMutation({
    mutationFn: async (prescription: Prescription) => {
      const updated = [...prescriptions, prescription];
      await AsyncStorage.setItem(
        STORAGE_KEYS.PRESCRIPTIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });

  const updatePrescriptionMutation = useMutation({
    mutationFn: async (prescription: Prescription) => {
      const updated = prescriptions.map((p: Prescription) =>
        p.id === prescription.id ? prescription : p
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.PRESCRIPTIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });

  const deletePrescriptionMutation = useMutation({
    mutationFn: async (id: string) => {
      const updated = prescriptions.filter((p: Prescription) => p.id !== id);
      await AsyncStorage.setItem(
        STORAGE_KEYS.PRESCRIPTIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["prescriptions"] });
    },
  });

  const addRecommendationMutation = useMutation({
    mutationFn: async (recommendation: Recommendation) => {
      const updated = [...recommendations, recommendation];
      await AsyncStorage.setItem(
        STORAGE_KEYS.RECOMMENDATIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const markRecommendationReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const updated = recommendations.map((r: Recommendation) =>
        r.id === id ? { ...r, isRead: true } : r
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.RECOMMENDATIONS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recommendations"] });
    },
  });

  const addReminderMutation = useMutation({
    mutationFn: async (reminder: Reminder) => {
      const updated = [...reminders, reminder];
      await AsyncStorage.setItem(
        STORAGE_KEYS.REMINDERS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const updateReminderMutation = useMutation({
    mutationFn: async (reminder: Reminder) => {
      const updated = reminders.map((r: Reminder) =>
        r.id === reminder.id ? reminder : r
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.REMINDERS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const deleteReminderMutation = useMutation({
    mutationFn: async (id: string) => {
      const updated = reminders.filter((r: Reminder) => r.id !== id);
      await AsyncStorage.setItem(
        STORAGE_KEYS.REMINDERS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const toggleReminderCompletedMutation = useMutation({
    mutationFn: async (id: string) => {
      const updated = reminders.map((r: Reminder) =>
        r.id === id ? { ...r, isCompleted: !r.isCompleted } : r
      );
      await AsyncStorage.setItem(
        STORAGE_KEYS.REMINDERS,
        JSON.stringify(updated)
      );
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reminders"] });
    },
  });

  const getChildGrowthRecords = useCallback(
    (childId: string) => {
      return growthRecords
        .filter((r: GrowthRecord) => r.childId === childId)
        .sort(
          (a: GrowthRecord, b: GrowthRecord) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
    },
    [growthRecords]
  );

  const getChildVaccinations = useCallback(
    (childId: string) => {
      return vaccinations.filter(
        (v: VaccinationRecord) => v.childId === childId
      );
    },
    [vaccinations]
  );

  const getChildPrescriptions = useCallback(
    (childId: string) => {
      return prescriptions.filter(
        (p: Prescription) => p.childId === childId && p.isActive
      );
    },
    [prescriptions]
  );

  const getChildRecommendations = useCallback(
    (childId: string) => {
      return recommendations
        .filter((r: Recommendation) => r.childId === childId)
        .sort(
          (a: Recommendation, b: Recommendation) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    },
    [recommendations]
  );

  const getChildReminders = useCallback(
    (childId: string) => {
      return reminders
        .filter((r: Reminder) => r.childId === childId)
        .sort(
          (a: Reminder, b: Reminder) =>
            new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime()
        );
    },
    [reminders]
  );

  return useMemo(
    () => ({
      children,
      selectedChild,
      selectedChildId,
      setSelectedChildId,
      addChild: addChildMutation.mutate,
      updateChild: updateChildMutation.mutate,
      addGrowthRecord: addGrowthRecordMutation.mutate,
      addVaccination: addVaccinationMutation.mutate,
      updateVaccination: updateVaccinationMutation.mutate,
      addPrescription: addPrescriptionMutation.mutate,
      updatePrescription: updatePrescriptionMutation.mutate,
      deletePrescription: deletePrescriptionMutation.mutate,
      addRecommendation: addRecommendationMutation.mutate,
      markRecommendationRead: markRecommendationReadMutation.mutate,
      addReminder: addReminderMutation.mutate,
      updateReminder: updateReminderMutation.mutate,
      deleteReminder: deleteReminderMutation.mutate,
      toggleReminderCompleted: toggleReminderCompletedMutation.mutate,
      getChildGrowthRecords,
      getChildVaccinations,
      getChildPrescriptions,
      getChildRecommendations,
      getChildReminders,
      isLoading:
        childrenQuery.isLoading ||
        growthQuery.isLoading ||
        vaccinationsQuery.isLoading ||
        prescriptionsQuery.isLoading ||
        recommendationsQuery.isLoading ||
        remindersQuery.isLoading,
    }),
    [
      children,
      selectedChild,
      selectedChildId,
      addChildMutation.mutate,
      updateChildMutation.mutate,
      addGrowthRecordMutation.mutate,
      addVaccinationMutation.mutate,
      updateVaccinationMutation.mutate,
      addPrescriptionMutation.mutate,
      updatePrescriptionMutation.mutate,
      deletePrescriptionMutation.mutate,
      addRecommendationMutation.mutate,
      markRecommendationReadMutation.mutate,
      addReminderMutation.mutate,
      updateReminderMutation.mutate,
      deleteReminderMutation.mutate,
      toggleReminderCompletedMutation.mutate,
      getChildGrowthRecords,
      getChildVaccinations,
      getChildPrescriptions,
      getChildRecommendations,
      getChildReminders,
      childrenQuery.isLoading,
      growthQuery.isLoading,
      vaccinationsQuery.isLoading,
      prescriptionsQuery.isLoading,
      recommendationsQuery.isLoading,
      remindersQuery.isLoading,
    ]
  );
});
