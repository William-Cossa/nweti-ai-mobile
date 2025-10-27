import Colors from "@/constants/colors";
import { Calendar } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface VaccineProgressProps {
  progress: number;
  completed: number;
  total: number;
}

export default function VaccineProgress({
  progress,
  completed,
  total,
}: VaccineProgressProps) {
  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <Calendar size={20} color={Colors.info} />
        <Text style={styles.chartTitle}>Progresso de Vacinação</Text>
      </View>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {completed} de {total} vacinas aplicadas
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  chartSection: { marginBottom: 24 },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  chartTitle: { fontSize: 18, fontWeight: "700", color: Colors.text },
  progressContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.borderLight,
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 12,
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.info,
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
