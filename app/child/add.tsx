import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Baby } from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddChildScreen() {
  const router = useRouter();
  const { addChild } = useChild();
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  const handleSave = () => {
    if (!name || !dateOfBirth || !weight || !height) {
      Alert.alert("Erro", "Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const newChild = {
      id: Date.now().toString(),
      name,
      dateOfBirth,
      gender,
      weight: parseFloat(weight),
      height: parseFloat(height),
      medicalNotes,
      createdAt: new Date().toISOString(),
    };

    addChild(newChild);
    Alert.alert("Sucesso", "Criança adicionada com sucesso", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.icon}>
            <Baby size={48} color={Colors.primary} />
          </View>
        </View>

        <Text style={styles.label}>Nome da Criança *</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          placeholderTextColor={Colors.textLight}
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Data de Nascimento *</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/AAAA"
          placeholderTextColor={Colors.textLight}
          value={dateOfBirth}
          onChangeText={setDateOfBirth}
        />

        <Text style={styles.label}>Sexo *</Text>
        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "male" && styles.genderButtonActive,
            ]}
            onPress={() => setGender("male")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "male" && styles.genderTextActive,
              ]}
            >
              Masculino
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.genderButton,
              gender === "female" && styles.genderButtonActive,
            ]}
            onPress={() => setGender("female")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "female" && styles.genderTextActive,
              ]}
            >
              Feminino
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Peso Atual (kg) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 3.5"
          placeholderTextColor={Colors.textLight}
          value={weight}
          onChangeText={setWeight}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Altura Atual (cm) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 50"
          placeholderTextColor={Colors.textLight}
          value={height}
          onChangeText={setHeight}
          keyboardType="decimal-pad"
        />

        <Text style={styles.label}>Observações Médicas</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Alergias, condições especiais, etc."
          placeholderTextColor={Colors.textLight}
          value={medicalNotes}
          onChangeText={setMedicalNotes}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Guardar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
  },
  iconContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  icon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  genderContainer: {
    flexDirection: "row",
    gap: 12,
  },
  genderButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    alignItems: "center",
  },
  genderButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  genderText: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  genderTextActive: {
    color: Colors.primary,
  },
  button: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 32,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonGradient: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700" as const,
  },
});
