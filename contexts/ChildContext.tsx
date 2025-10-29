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

import * as childrenService from "../src/services/children";
import * as growthService from "../src/services/growth";
import * as prescriptionService from "../src/services/prescription";
import * as reminderService from "../src/services/reminder";
import * as vaccinationService from "../src/services/vaccination";

const STORAGE_KEYS = {
  RECOMMENDATIONS: "@health_app_recommendations",
};

export const [ChildProvider, useChild] = createContextHook(() => {
  const queryClient = useQueryClient();
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);

  const childrenQuery = useQuery({
    queryKey: ["children"],
    queryFn: childrenService.getAllChildren,
  });

  const recommendationsQuery = useQuery({
    queryKey: ["recommendations"],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.RECOMMENDATIONS);
      return stored ? JSON.parse(stored) : [];
    },
  });

  const children = useMemo(
    () => childrenQuery.data || [],
    [childrenQuery.data]
  );
  const selectedChild =
    children.find((c: Child) => c.id === selectedChildId) || children[0];

  const remindersQuery = useQuery({
    queryKey: ["reminders", selectedChild?.id],
    queryFn: () => reminderService.getReminders(selectedChild!.id),
    enabled: !!selectedChild,
  });
  const growthQuery = useQuery({
    queryKey: ["growth", selectedChild?.id],
    queryFn: () => growthService.getGrowthRecords(selectedChild!.id),
    enabled: !!selectedChild,
  });
  const vaccinationsQuery = useQuery({
    queryKey: ["vaccinations", selectedChild?.id],
    queryFn: () => vaccinationService.getVaccinationRecords(selectedChild!.id),
    enabled: !!selectedChild,
  });

  const prescriptionsQuery = useQuery({
    queryKey: ["prescriptions", selectedChild?.id],
    queryFn: () =>
      prescriptionService.getPrescriptionsByChildId(selectedChild!.id),
    enabled: !!selectedChild,
  });

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

  useEffect(() => {
    if (children.length > 0 && !selectedChildId) {
      setSelectedChildId(children[0].id);
    }
  }, [children, selectedChildId]);

  const addChildMutation = useMutation({
    mutationFn: childrenService.createChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const updateChildMutation = useMutation({
    mutationFn: (child: Child) => childrenService.updateChild(child.id, child),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const deleteChildMutation = useMutation({
    mutationFn: childrenService.deleteChild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["children"] });
    },
  });

  const addGrowthRecordMutation = useMutation({
    mutationFn: (record: GrowthRecord) =>
      growthService.addGrowthRecord(selectedChild!.id, record),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["growth", selectedChild?.id],
      });
    },
  });

  const updateVaccinationRecordMutation = useMutation({
    mutationFn: ({
      id,
      record,
    }: {
      id: string;
      record: Partial<VaccinationRecord>;
    }) => vaccinationService.updateVaccinationRecord(id, record),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["vaccinations", selectedChild?.id],
      });
    },
  });

  const addPrescriptionMutation = useMutation({
    mutationFn: prescriptionService.createPrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prescriptions", selectedChild?.id],
      });
    },
  });

  const updatePrescriptionMutation = useMutation({
    mutationFn: ({
      id,
      prescription,
    }: {
      id: string;
      prescription: Partial<Prescription>;
    }) => prescriptionService.updatePrescription(id, prescription),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prescriptions", selectedChild?.id],
      });
    },
  });

  const deletePrescriptionMutation = useMutation({
    mutationFn: prescriptionService.deletePrescription,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["prescriptions", selectedChild?.id],
      });
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
    mutationFn: reminderService.createReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders", selectedChild?.id],
      });
    },
  });

  const updateReminderMutation = useMutation({
    mutationFn: ({
      id,
      reminder,
    }: {
      id: string;
      reminder: Partial<Reminder>;
    }) => reminderService.updateReminder(id, reminder),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders", selectedChild?.id],
      });
    },
  });

  const deleteReminderMutation = useMutation({
    mutationFn: reminderService.deleteReminder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reminders", selectedChild?.id],
      });
    },
  });

  const getChildGrowthRecords = useCallback(() => {
    return growthRecords.sort(
      (a: GrowthRecord, b: GrowthRecord) =>
        new Date(a.date!).getTime() - new Date(b.date!).getTime()
    );
  }, [growthRecords]);

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
      deleteChild: deleteChildMutation.mutate,
      addGrowthRecord: addGrowthRecordMutation.mutate,
      isAddingGrowthRecord: addGrowthRecordMutation.isPending,
      updateVaccinationRecord: updateVaccinationRecordMutation.mutate,
      isUpdatingVaccinationRecord: updateVaccinationRecordMutation.isPending,
      addPrescription: addPrescriptionMutation.mutate,
      updatePrescription: updatePrescriptionMutation.mutate,
      deletePrescription: deletePrescriptionMutation.mutate,
      addRecommendation: addRecommendationMutation.mutate,
      markRecommendationRead: markRecommendationReadMutation.mutate,
      addReminder: addReminderMutation.mutate,
      isAddingReminder: addReminderMutation.isPending,
      updateReminder: updateReminderMutation.mutate,
      isUpdatingReminder: updateReminderMutation.isPending,
      deleteReminder: deleteReminderMutation.mutate,
      isDeletingReminder: deleteReminderMutation.isPending,
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
      deleteChildMutation.mutate,
      addGrowthRecordMutation.mutate,
      addGrowthRecordMutation.isPending,
      updateVaccinationRecordMutation.mutate,
      updateVaccinationRecordMutation.isPending,
      addPrescriptionMutation.mutate,
      updatePrescriptionMutation.mutate,
      deletePrescriptionMutation.mutate,
      addRecommendationMutation.mutate,
      markRecommendationReadMutation.mutate,
      addReminderMutation.mutate,
      addReminderMutation.isPending,
      updateReminderMutation.mutate,
      updateReminderMutation.isPending,
      deleteReminderMutation.mutate,
      deleteReminderMutation.isPending,
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
