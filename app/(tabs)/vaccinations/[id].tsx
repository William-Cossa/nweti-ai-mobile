import { UpdateVaccinationModal } from "@/components/vaccinations";
import UpdateVaccinationModalOver from "@/components/vaccinations/UpdateVaccinationModalOver";
import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { VaccinationRecord } from "@/types";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  Info,
  Shield,
  Syringe,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function VaccineDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {
    selectedChild,
    getChildVaccinations,
    isLoading,
    isUpdatingVaccinationRecord,
    updateVaccinationRecord,
  } = useChild();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalOverVisible, setModalOverVisible] = useState(false);
  const [selectedVaccination, setSelectedVaccination] =
    useState<VaccinationRecord>();

  const handleOpenModal = (vaccination: VaccinationRecord) => {
    setSelectedVaccination(vaccination);
    setModalVisible(true);
  };

  const handleOpenModalOver = (vaccination: VaccinationRecord) => {
    setSelectedVaccination(vaccination);
    setModalOverVisible(true);
  };
  const vaccinations = selectedChild
    ? getChildVaccinations(selectedChild.id)
    : [];
  const vaccination = vaccinations.find((v) => v.vaccineId === id);
  const vaccinationRecord = vaccinations.find((v: any) => v.vaccineId === id);
  const status = vaccinationRecord?.status || "pending";

  if (!vaccination) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Vacina não encontrada</Text>
      </View>
    );
  }

  const getStatusIcon = () => {
    switch (status) {
      case "completed":
        return <CheckCircle size={32} color={Colors.success} />;
      case "overdue":
        return <AlertCircle size={32} color={Colors.danger} />;
      default:
        return <Clock size={32} color={Colors.warning} />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Aplicada";
      case "overdue":
        return "Atrasada";
      default:
        return "Pendente";
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return Colors.success;
      case "overdue":
        return Colors.danger;
      default:
        return Colors.warning;
    }
  };
  const handleSave = (date: Date, notes: string) => {
    if (selectedVaccination) {
      const updatedRecord = {
        status: "completed",
        dateAdministered: date.toISOString(),
        notes,
      };

      updateVaccinationRecord({
        id: selectedVaccination.id,
        record: updatedRecord,
      });
      setModalVisible(false);
    }
  };
  const handleSaveOver = (date: Date, notes: string) => {
    if (selectedVaccination) {
      const updatedRecord = {
        status: "overdue",
        // dateAdministered: date.toISOString(),
        notes,
      };

      updateVaccinationRecord({
        id: selectedVaccination.id,
        record: updatedRecord,
      });
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: vaccination.vaccine.name }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View
          style={[
            styles.statusCard,
            { backgroundColor: getStatusColor() + "20" },
          ]}
        >
          <View style={styles.statusHeader}>
            {getStatusIcon()}
            <View style={styles.statusInfo}>
              <Text style={[styles.statusText, { color: getStatusColor() }]}>
                {getStatusText()}
              </Text>
              <Text style={styles.statusAge}>
                {vaccination.vaccine.recommendedAge}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Syringe size={24} color={Colors.primary} />
            <Text style={styles.sectionTitle}>Sobre a Vacina</Text>
          </View>
          <Text style={styles.vaccineName}>{vaccination.vaccine.name}</Text>
          <Text style={styles.description}>
            {vaccination.vaccine.description}
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Shield size={24} color={Colors.success} />
            <Text style={styles.sectionTitle}>Utilidade</Text>
          </View>
          <Text style={styles.bodyText}>{vaccination.vaccine.utility}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info size={24} color={Colors.info} />
            <Text style={styles.sectionTitle}>Protege Contra</Text>
          </View>
          {vaccination.vaccine.diseases.map((disease: any, index: number) => (
            <View key={index} style={styles.listItem}>
              <View style={styles.bullet} />
              <Text style={styles.listText}>{disease}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <AlertTriangle size={24} color={Colors.warning} />
            <Text style={styles.sectionTitle}>Efeitos Secundários Comuns</Text>
          </View>
          {vaccination.vaccine.sideEffects.map((effect: any, index: number) => (
            <View key={index} style={styles.listItem}>
              <View
                style={[styles.bullet, { backgroundColor: Colors.warning }]}
              />
              <Text style={styles.listText}>{effect}</Text>
            </View>
          ))}
          <Text style={styles.noteText}>
            Estes efeitos são geralmente leves e temporários. Consulte um médico
            se persistirem.
          </Text>
        </View>

        {vaccination.vaccine.contraindications &&
          vaccination.vaccine.contraindications.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <AlertCircle size={24} color={Colors.danger} />
                <Text style={styles.sectionTitle}>Contraindicações</Text>
              </View>
              {vaccination.vaccine.contraindications.map(
                (contraindication: any, index: number) => (
                  <View key={index} style={styles.listItem}>
                    <View
                      style={[
                        styles.bullet,
                        { backgroundColor: Colors.danger },
                      ]}
                    />
                    <Text style={styles.listText}>{contraindication}</Text>
                  </View>
                )
              )}
            </View>
          )}

        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Número de Doses</Text>
          <Text style={styles.infoValue}>
            {vaccination.vaccine.dosesRequired}{" "}
            {vaccination.vaccine.dosesRequired === 1 ? "dose" : "doses"}
          </Text>
        </View>

        {vaccinationRecord?.dateAdministered && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Data de Administração</Text>
            <Text style={styles.infoValue}>
              {new Date(vaccinationRecord.dateAdministered).toLocaleDateString(
                "pt-PT"
              )}
            </Text>
          </View>
        )}

        {vaccinationRecord?.nextDoseDate && (
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Próxima Dose</Text>
            <Text style={styles.infoValue}>
              {new Date(vaccinationRecord.nextDoseDate).toLocaleDateString(
                "pt-PT"
              )}
            </Text>
          </View>
        )}
        <UpdateVaccinationModal
          visible={modalVisible}
          isSaving={isUpdatingVaccinationRecord}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
        />
        <UpdateVaccinationModalOver
          visible={modalOverVisible}
          isSaving={isUpdatingVaccinationRecord}
          onClose={() => setModalOverVisible(false)}
          onSave={handleSaveOver}
        />
        {status !== "completed" && (
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleOpenModal(vaccination)}
          >
            <Text style={styles.actionButtonText}>Marcar como Aplicada</Text>
          </TouchableOpacity>
        )}
        {status !== "overdue" && (
          <TouchableOpacity
            style={styles.actionButtonDanger}
            onPress={() => handleOpenModalOver(vaccination)}
          >
            <Text style={styles.actionButtonText}>Marcar como Atrasada</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
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
    paddingBottom: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  statusCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  statusHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  statusInfo: {
    flex: 1,
  },
  statusText: {
    fontSize: 24,
    fontWeight: "700" as const,
    marginBottom: 4,
  },
  statusAge: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: "600" as const,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  vaccineName: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
  },
  bodyText: {
    fontSize: 16,
    color: Colors.text,
    lineHeight: 24,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
    paddingLeft: 8,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
    marginTop: 8,
    marginRight: 12,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
    lineHeight: 22,
  },
  noteText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontStyle: "italic" as const,
    marginTop: 8,
    lineHeight: 20,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700" as const,
  },
  actionButtonDanger: {
    backgroundColor: Colors.danger,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
});
