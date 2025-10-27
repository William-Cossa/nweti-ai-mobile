import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface SummaryCardProps {
  records: any[];
}

export default function SummaryCard({ records }: SummaryCardProps) {
  const last = records[records.length - 1];

  return (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryTitle}>Última Medição</Text>
      <View style={styles.summaryRow}>
        <SummaryItem label="Peso" value={`${last.weight} kg`} />
        <View style={styles.summaryDivider} />
        <SummaryItem label="Altura" value={`${last.height} cm`} />
        <View style={styles.summaryDivider} />
        <SummaryItem
          label="Data"
          value={new Date(last.date).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "short",
          })}
        />
      </View>
    </View>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryItem}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  summaryCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: { alignItems: "center" },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  summaryDivider: { width: 1, backgroundColor: Colors.border },
});
