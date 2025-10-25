import Colors from "@/constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  weight: number;
  height: number;
}

export default function CurrentStats({ weight, height }: Props) {
  return (
    <View style={styles.currentStats}>
      <LinearGradient
        colors={Colors.gradient.primary}
        style={styles.statsGradient}
      >
        <Text style={styles.statsTitle}>Medição Atual</Text>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{weight}</Text>
            <Text style={styles.statLabel}>kg</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{height}</Text>
            <Text style={styles.statLabel}>cm</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  currentStats: { borderRadius: 16, overflow: "hidden", marginBottom: 24 },
  statsGradient: { padding: 24 },
  statsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  statsRow: { flexDirection: "row", justifyContent: "space-around" },
  statBox: { alignItems: "center" },
  statValue: {
    fontSize: 40,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 4,
  },
  statLabel: { fontSize: 16, color: "#fff", opacity: 0.9 },
  statDivider: { width: 1, backgroundColor: "#fff", opacity: 0.3 },
});
