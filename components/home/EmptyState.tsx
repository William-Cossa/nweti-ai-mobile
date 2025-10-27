import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Baby, Plus } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function EmptyState() {
  const router = useRouter();

  return (
    <View style={styles.emptyContainer}>
      <Baby size={64} color={Colors.textLight} />
      <Text style={styles.emptyTitle}>Nenhuma criança registada</Text>
      <Text style={styles.emptySubtitle}>
        Adicione o perfil da sua criança para começar a acompanhar o crescimento
        e saúde
      </Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.push("/child/add" as any)}
      >
        <LinearGradient
          colors={Colors.gradient.primary}
          style={styles.addButtonGradient}
        >
          <Plus size={24} color="#FFFFFF" />
          <Text style={styles.addButtonText}>Adicionar Criança</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.background,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  addButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "700" },
});
