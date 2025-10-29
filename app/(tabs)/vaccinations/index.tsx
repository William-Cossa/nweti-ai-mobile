import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";

import { Spinner } from "@/components/ui/spinner";
import { UpdateVaccinationModal } from "@/components/vaccinations";
import { Stack, useRouter } from "expo-router";
import { AlertCircle, CheckCircle, Clock } from "lucide-react-native";
import { useState } from "react";

import { VaccinationRecord } from "@/types";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VaccinationsScreen() {
  const router = useRouter();
  const {
    selectedChild,
    getChildVaccinations,
    isLoading,
    isUpdatingVaccinationRecord,
    updateVaccinationRecord,
  } = useChild();
  const vaccinations = selectedChild
    ? getChildVaccinations(selectedChild.id)
    : [];
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVaccination, setSelectedVaccination] =
    useState<VaccinationRecord>();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={24} color={Colors.success} />;
      case "overdue":
        return <AlertCircle size={24} color={Colors.danger} />;
      default:
        return <Clock size={24} color={Colors.warning} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return Colors.successLight;
      case "overdue":
        return Colors.dangerLight;
      default:
        return Colors.warningLight;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Aplicada";
      case "overdue":
        return "Atrasada";
      default:
        return "Pendente";
    }
  };

  const handleOpenModal = (vaccination: VaccinationRecord) => {
    setSelectedVaccination(vaccination);
    setModalVisible(true);
  };

  const handleSave = (date: Date, notes: string) => {
    if (selectedVaccination) {
      const updatedRecord = {
        status: "completed",
        dateAdministered: date.toISOString(),
        notes,
      };

      console.log("💉 Record a atualizar:", updatedRecord); // 👈 Log detalhado

      updateVaccinationRecord({
        id: selectedVaccination.id,
        record: updatedRecord,
      });
      setModalVisible(false);
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver as vacinas
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: "Calendário de Vacinação" }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Calendário de Vacinação</Text>
          <Text style={styles.headerSubtitle}>
            Acompanhe as vacinas do seu filho
          </Text>
        </View>

        {vaccinations.map((vaccination) => {
          const { vaccine, status } = vaccination;
          return (
            <View key={vaccine.id} style={styles.vaccineCardContainer}>
              <TouchableOpacity
                style={[
                  styles.vaccineCard,
                  { backgroundColor: getStatusColor(status) },
                ]}
                onPress={() =>
                  router.push(`/(tabs)/vaccinations/${vaccine.id}` as any)
                }
              >
                <View style={styles.vaccineHeader}>
                  <View style={styles.vaccineInfo}>
                    <Text style={styles.vaccineName}>{vaccine.name}</Text>
                    <Text style={styles.vaccineAge}>
                      {vaccine.recommendedAge}
                    </Text>
                  </View>
                  {getStatusIcon(status)}
                </View>
                <Text style={styles.vaccineDescription}>
                  {vaccine.description}
                </Text>
                <View style={styles.vaccineFooter}>
                  <Text
                    style={[
                      styles.statusText,
                      {
                        color:
                          status === "completed"
                            ? Colors.success
                            : status === "overdue"
                            ? Colors.danger
                            : Colors.warning,
                      },
                    ]}
                  >
                    {getStatusText(status)}
                  </Text>
                </View>
              </TouchableOpacity>
              {status !== "completed" && (
                <TouchableOpacity
                  style={styles.applyButton}
                  onPress={() => handleOpenModal(vaccination)}
                >
                  <Text style={styles.applyButtonText}>
                    Marcar como aplicada
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
      <UpdateVaccinationModal
        visible={modalVisible}
        isSaving={isUpdatingVaccinationRecord}
        onClose={() => setModalVisible(false)}
        onSave={handleSave}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  vaccineCardContainer: {
    marginBottom: 12,
  },
  vaccineCard: {
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  vaccineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  vaccineInfo: {
    flex: 1,
  },
  vaccineName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  vaccineAge: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  vaccineDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  vaccineFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    fontSize: 14,
    fontWeight: "700" as const,
  },
});
