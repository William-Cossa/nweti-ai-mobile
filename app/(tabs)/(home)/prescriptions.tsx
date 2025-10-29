import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Prescription } from "@/types";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar, Clock, Pill, Plus, X } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrescriptionsScreen() {
  const {
    selectedChild,
    addPrescription,
    deletePrescription,
    getChildPrescriptions,
  } = useChild();

  const [modalVisible, setModalVisible] = useState(false);
  const [medicationName, setMedicationName] = useState("");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("");
  const [notes, setNotes] = useState("");
  const prescriptions = selectedChild
    ? getChildPrescriptions(selectedChild.id)
    : [];

  const handleAddPrescription = () => {
    if (!medicationName || !dosage || !frequency) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
      return;
    }

    if (selectedChild) {
      addPrescription({
        childId: selectedChild.id,
        medicationName,
        dosage,
        frequency,
        startDate: new Date().toISOString(),
        notes,
      });

      setMedicationName("");
      setDosage("");
      setFrequency("");
      setNotes("");
      setModalVisible(false);
      Alert.alert("Sucesso", "Prescrição adicionada com sucesso");
    }
  };

  const handleDeletePrescription = (id: string) => {
    Alert.alert(
      "Eliminar Prescrição",
      "Tem a certeza que deseja eliminar esta prescrição?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deletePrescription(id),
        },
      ]
    );
  };

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver as prescrições
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Prescrições Médicas</Text>
            <Text style={styles.headerSubtitle}>
              {prescriptions.length}{" "}
              {prescriptions.length === 1
                ? "prescrição activa"
                : "prescrições activas"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {prescriptions.length === 0 ? (
          <View style={styles.emptyState}>
            <Pill size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>Nenhuma prescrição</Text>
            <Text style={styles.emptySubtitle}>
              Adicione as prescrições médicas do seu filho
            </Text>
          </View>
        ) : (
          prescriptions.map((prescription: Prescription) => (
            <View key={prescription.id} style={styles.prescriptionCard}>
              <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                  <Pill size={24} color={Colors.warning} />
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeletePrescription(prescription.id)}
                >
                  <X size={20} color={Colors.danger} />
                </TouchableOpacity>
              </View>
              <Text style={styles.medicationName}>
                {prescription.medicationName}
              </Text>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Dosagem:</Text>
                <Text style={styles.detailValue}>{prescription.dosage}</Text>
              </View>
              <View style={styles.detailRow}>
                <Clock size={16} color={Colors.textSecondary} />
                <Text style={styles.detailValue}>{prescription.frequency}</Text>
              </View>
              {prescription.notes && (
                <Text style={styles.notes}>{prescription.notes}</Text>
              )}
              <View style={styles.dateContainer}>
                <Calendar size={14} color={Colors.textLight} />
                <Text style={styles.dateText}>
                  Desde{" "}
                  {new Date(prescription.startDate).toLocaleDateString("pt-PT")}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nova Prescrição</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.label}>Medicamento *</Text>
              <TextInput
                style={styles.input}
                placeholder="Nome do medicamento"
                placeholderTextColor={Colors.textLight}
                value={medicationName}
                onChangeText={setMedicationName}
              />

              <Text style={styles.label}>Dosagem *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 5ml, 1 comprimido"
                placeholderTextColor={Colors.textLight}
                value={dosage}
                onChangeText={setDosage}
              />

              <Text style={styles.label}>Frequência *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2x ao dia, De 8 em 8 horas"
                placeholderTextColor={Colors.textLight}
                value={frequency}
                onChangeText={setFrequency}
              />

              <Text style={styles.label}>Observações</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Instruções adicionais"
                placeholderTextColor={Colors.textLight}
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleAddPrescription}
              >
                <LinearGradient
                  colors={Colors.gradient.primary}
                  style={styles.saveButtonGradient}
                >
                  <Text style={styles.saveButtonText}>Guardar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  prescriptionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.warningLight,
    alignItems: "center",
    justifyContent: "center",
  },
  deleteButton: {
    padding: 8,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  detailValue: {
    fontSize: 14,
    color: Colors.text,
  },
  notes: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: "italic" as const,
    marginTop: 8,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 8,
  },
  dateText: {
    fontSize: 12,
    color: Colors.textLight,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 24,
    marginBottom: 16,
  },
  saveButtonGradient: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  saveButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700" as const,
  },
});
