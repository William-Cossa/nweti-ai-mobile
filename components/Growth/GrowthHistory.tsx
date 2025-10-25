import Colors from "@/constants/colors";
import { TrendingUp } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";
import RecordCard from "./RecordCard";

interface Props {
  records: any[];
}

export default function GrowthHistory({ records }: Props) {
  if (records.length === 0) {
    return (
      <View style={styles.emptyState}>
        <TrendingUp size={64} color={Colors.textLight} />
        <Text style={styles.emptyTitle}>Nenhuma medição</Text>
        <Text style={styles.emptySubtitle}>
          Adicione a primeira medição para começar a acompanhar o crescimento
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.recordsList}>
      {records
        .slice()
        .reverse()
        .map((record, index) => (
          <RecordCard key={record.id} record={record} isLatest={index === 0} />
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  recordsList: { gap: 12 },
  emptyState: { alignItems: "center", paddingVertical: 48 },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 32,
  },
});
