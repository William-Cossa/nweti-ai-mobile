import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

export default function StatsCard() {
  const { selectedChild, getChildGrowthRecords } = useChild();
  const growthRecords = selectedChild
    ? getChildGrowthRecords(selectedChild.id)
    : [];
  const latestGrowth = growthRecords[growthRecords.length - 1];

  if (!latestGrowth) return null;

  return (
    <View style={styles.statsCard}>
      <LinearGradient
        colors={Colors.gradient.primary}
        style={styles.statsGradient}
      >
        <Text style={styles.statsTitle}>Última Medição</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{latestGrowth.weight} kg</Text>
            <Text style={styles.statLabel}>Peso</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{latestGrowth.height} cm</Text>
            <Text style={styles.statLabel}>Altura</Text>
          </View>
        </View>
        <Text style={styles.statsDate}>
          {new Date(latestGrowth.date).toLocaleDateString("pt-PT")}
        </Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  statsCard: {
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: Colors.shadowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  statsGradient: { padding: 20 },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  statItem: { alignItems: "center" },
  statValue: {
    fontSize: 32,
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: { fontSize: 14, color: "#FFFFFF", opacity: 0.9 },
  statDivider: { width: 1, backgroundColor: "#FFFFFF", opacity: 0.3 },
  statsDate: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
  },
});
