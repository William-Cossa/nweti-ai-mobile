import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Child } from "@/types";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as childrenService from "@/src/services/children";

export default function ChildDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { updateChild, deleteChild } = useChild();

  const [child, setChild] = useState<Child | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [medicalNotes, setMedicalNotes] = useState("");

  useEffect(() => {
    const fetchChild = async () => {
      if (id) {
        try {
          const fetchedChild = await childrenService.getChildById(id as string);
          setChild(fetchedChild);
          setName(fetchedChild.name);
          setDateOfBirth(fetchedChild.dateOfBirth);
          setGender(fetchedChild.gender);
          setWeight(fetchedChild.weight?.toString() || "");
          setHeight(fetchedChild.height?.toString() || "");
          setMedicalNotes(fetchedChild.medicalNotes || "");
        } catch (error) {
          console.error("Error fetching child:", error);
          Alert.alert("Erro", "Não foi possível carregar os dados da criança.");
        } finally {
          setLoading(false);
        }
      }
    };
    fetchChild();
  }, [id]);

  const handleSave = async () => {
    if (!child) return;

    if (!name || !dateOfBirth || !gender) {
      Alert.alert("Erro", "Nome, data de nascimento e gênero são obrigatórios.");
      return;
    }

    try {
      await updateChild(child.id, {
        name,
        dateOfBirth,
        gender,
        weight: weight ? parseFloat(weight) : undefined,
        height: height ? parseFloat(height) : undefined,
        medicalNotes,
      });
      Alert.alert("Sucesso", "Dados da criança atualizados com sucesso!");
      router.back();
    } catch (error) {
      console.error("Error updating child:", error);
      Alert.alert("Erro", "Não foi possível atualizar os dados da criança.");
    }
  };

  const handleDelete = () => {
    if (!child) return;

    Alert.alert(
      "Eliminar Criança",
      "Tem a certeza que deseja eliminar esta criança? Esta ação é irreversível.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteChild(child.id);
              Alert.alert("Sucesso", "Criança eliminada com sucesso!");
              router.replace("/profile" as any);
            } catch (error) {
              console.error("Error deleting child:", error);
              Alert.alert("Erro", "Não foi possível eliminar a criança.");
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </SafeAreaView>
    );
  }

  if (!child) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.errorText}>Criança não encontrada.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Editar Criança</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Nome completo da criança"
            placeholderTextColor={Colors.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Data de Nascimento</Text>
          <TextInput
            style={styles.input}
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
            placeholder="AAAA-MM-DD"
            placeholderTextColor={Colors.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gênero</Text>
          <TextInput
            style={styles.input}
            value={gender}
            onChangeText={setGender}
            placeholder="Masculino/Feminino/Outro"
            placeholderTextColor={Colors.textLight}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
            placeholder="Ex: 10.5"
            placeholderTextColor={Colors.textLight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Altura (cm)</Text>
          <TextInput
            style={styles.input}
            value={height}
            onChangeText={setHeight}
            placeholder="Ex: 80"
            placeholderTextColor={Colors.textLight}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Notas Médicas</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={medicalNotes}
            onChangeText={setMedicalNotes}
            placeholder="Informações médicas relevantes"
            placeholderTextColor={Colors.textLight}
            multiline
            numberOfLines={4}
          />
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.saveButtonGradient}
          >
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.deleteButtonText}>Eliminar Criança</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 16,
    color: Colors.danger,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 32,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: Colors.text,
    marginBottom: 8,
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
  saveButton: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 32,
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
  deleteButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    backgroundColor: Colors.dangerLight,
  },
  deleteButtonText: {
    color: Colors.danger,
    fontSize: 16,
    fontWeight: "700" as const,
  },
});
