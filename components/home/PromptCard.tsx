import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { useRouter } from "expo-router";
import { TrendingUp } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function PromptCard() {
  const router = useRouter();
  const { selectedChild, getChildGrowthRecords } = useChild();
  const growthRecords = selectedChild ? getChildGrowthRecords() : [];
  const latestGrowth = growthRecords[growthRecords.length - 1];

  if (latestGrowth) return null;

  return (
    <View style={styles.promptCard}>
      <TrendingUp size={32} color={Colors.primary} />
      <Text style={styles.promptTitle}>Adicione a primeira medição</Text>
      <Text style={styles.promptSubtitle}>
        Comece a acompanhar o crescimento do seu filho
      </Text>
      <TouchableOpacity
        style={styles.promptButton}
        onPress={() => router.push("/(tabs)/(home)/growth" as any)}
      >
        <Text style={styles.promptButtonText}>Adicionar Medição</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  promptCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  promptButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  promptButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
});
