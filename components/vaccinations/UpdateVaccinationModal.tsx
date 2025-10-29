import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { X } from "lucide-react-native";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { DatePicker } from "../ui/date-picker";
import { Spinner } from "../ui/spinner";

interface Props {
  visible: boolean;
  isSaving: boolean;
  onClose: () => void;
  onSave: (date: Date, notes: string) => void;
}

export default function UpdateVaccinationModal({
  visible,
  isSaving,
  onClose,
  onSave,
}: Props) {
  const [date] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [dateAdministered, setDateAdministered] = useState<Date | undefined>();

  const handleSave = () => {
    onSave(date, notes);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalOverlay}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Marcar como aplicada</Text>
              <TouchableOpacity onPress={onClose}>
                <X size={24} color={Colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Data de administração</Text>
            <DatePicker
              // label="Data de nascimento"
              value={dateAdministered}
              onChange={setDateAdministered}
              placeholder="Data de administração"
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
              onPress={handleSave}
              disabled={isSaving}
            >
              <LinearGradient
                colors={Colors.gradient.primary}
                style={styles.saveButtonGradient}
              >
                {isSaving ? (
                  <Spinner />
                ) : (
                  <Text style={styles.saveButtonText}>Guardar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  scrollContent: { flexGrow: 1, justifyContent: "flex-end" },
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
  modalTitle: { fontSize: 24, fontWeight: "700", color: Colors.text },
  label: {
    fontSize: 16,
    fontWeight: "600",
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
  textArea: { height: 80, textAlignVertical: "top" },
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
  saveButtonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
