import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { LinearGradient } from "expo-linear-gradient";
import { Plus, TrendingUp, X } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function GrowthScreen() {
  const { selectedChild, getChildGrowthRecords, addGrowthRecord } = useChild();
  const growthRecords = selectedChild
    ? getChildGrowthRecords(selectedChild.id)
    : [];
  const [modalVisible, setModalVisible] = useState(false);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [notes, setNotes] = useState("");

  const handleAddRecord = () => {
    if (!weight || !height) {
      Alert.alert("Erro", "Por favor, preencha peso e altura");
      return;
    }

    if (selectedChild) {
      addGrowthRecord({
        id: Date.now().toString(),
        childId: selectedChild.id,
        date: new Date().toISOString(),
        weight: parseFloat(weight),
        height: parseFloat(height),
        notes,
      });

      setWeight("");
      setHeight("");
      setNotes("");
      setModalVisible(false);
      Alert.alert("Sucesso", "Medição adicionada com sucesso");
    }
  };

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver o crescimento
        </Text>
      </View>
    );
  }

  const latestRecord = growthRecords[growthRecords.length - 1];

  return (
    <>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {latestRecord && (
          <View style={styles.currentStats}>
            <LinearGradient
              colors={Colors.gradient.primary}
              style={styles.statsGradient}
            >
              <Text style={styles.statsTitle}>Medição Atual</Text>
              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{latestRecord.weight}</Text>
                  <Text style={styles.statLabel}>kg</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statBox}>
                  <Text style={styles.statValue}>{latestRecord.height}</Text>
                  <Text style={styles.statLabel}>cm</Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        )}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Histórico de Crescimento</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {growthRecords.length === 0 ? (
          <View style={styles.emptyState}>
            <TrendingUp size={64} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>Nenhuma medição</Text>
            <Text style={styles.emptySubtitle}>
              Adicione a primeira medição para começar a acompanhar o
              crescimento
            </Text>
          </View>
        ) : (
          <View style={styles.recordsList}>
            {growthRecords
              .slice()
              .reverse()
              .map((record: any, index: number) => (
                <View key={record.id} style={styles.recordCard}>
                  <View style={styles.recordHeader}>
                    <Text style={styles.recordDate}>
                      {new Date(record.date).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </Text>
                    {index === 0 && (
                      <View style={styles.latestBadge}>
                        <Text style={styles.latestText}>Mais recente</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.recordStats}>
                    <View style={styles.recordStat}>
                      <Text style={styles.recordLabel}>Peso</Text>
                      <Text style={styles.recordValue}>{record.weight} kg</Text>
                    </View>
                    <View style={styles.recordStat}>
                      <Text style={styles.recordLabel}>Altura</Text>
                      <Text style={styles.recordValue}>{record.height} cm</Text>
                    </View>
                  </View>
                  {record.notes && (
                    <Text style={styles.recordNotes}>{record.notes}</Text>
                  )}
                </View>
              ))}
          </View>
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
              <Text style={styles.modalTitle}>Nova Medição</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Peso (kg) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 3.5"
              placeholderTextColor={Colors.textLight}
              value={weight}
              onChangeText={setWeight}
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Altura (cm) *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: 50"
              placeholderTextColor={Colors.textLight}
              value={height}
              onChangeText={setHeight}
              keyboardType="decimal-pad"
            />

            <Text style={styles.label}>Observações</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Notas adicionais"
              placeholderTextColor={Colors.textLight}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={3}
            />

            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddRecord}
            >
              <LinearGradient
                colors={Colors.gradient.primary}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>Guardar</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  currentStats: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGradient: {
    padding: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 40,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 16,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingHorizontal: 32,
  },
  recordsList: {
    gap: 12,
  },
  recordCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recordDate: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  latestBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  latestText: {
    color: Colors.primary,
    fontSize: 12,
    fontWeight: "700" as const,
  },
  recordStats: {
    flexDirection: "row",
    gap: 24,
  },
  recordStat: {
    flex: 1,
  },
  recordLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  recordValue: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  recordNotes: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: "italic" as const,
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
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
