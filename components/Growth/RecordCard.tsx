import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface Props {
  record: any;
  isLatest?: boolean;
}

export default function RecordCard({ record, isLatest }: Props) {
  return (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>
          {new Date(record.date).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </Text>
        {isLatest && (
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
      {record.notes && <Text style={styles.recordNotes}>{record.notes}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  recordCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  recordDate: { fontSize: 16, fontWeight: "700", color: Colors.text },
  latestBadge: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  latestText: { color: Colors.primary, fontSize: 12, fontWeight: "700" },
  recordStats: { flexDirection: "row", gap: 24 },
  recordStat: { flex: 1 },
  recordLabel: { fontSize: 12, color: Colors.textSecondary, marginBottom: 4 },
  recordValue: { fontSize: 20, fontWeight: "700", color: Colors.text },
  recordNotes: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontStyle: "italic",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  },
});
