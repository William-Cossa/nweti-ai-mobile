import Colors from "@/constants/colors";
import { Activity, CheckCircle, Pill, TrendingUp } from "lucide-react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";

const { width } = Dimensions.get("window");

interface StatsGridProps {
  growthRecords: any[];
  completedVaccines: number;
  totalVaccines: number;
  prescriptions: any[];
  vaccineProgress: number;
}

export default function StatsGrid({
  growthRecords,
  completedVaccines,
  totalVaccines,
  prescriptions,
  vaccineProgress,
}: StatsGridProps) {
  return (
    <View style={styles.statsGrid}>
      <StatCard
        icon={<TrendingUp size={24} color={Colors.primary} />}
        value={growthRecords.length}
        label="Medições"
        backgroundColor={Colors.primaryLight}
      />
      <StatCard
        icon={<CheckCircle size={24} color={Colors.success} />}
        value={`${completedVaccines}/${totalVaccines}`}
        label="Vacinas"
        backgroundColor={Colors.successLight}
      />
      <StatCard
        icon={<Pill size={24} color={Colors.warning} />}
        value={prescriptions.length}
        label="Prescrições"
        backgroundColor={Colors.warningLight}
      />
      <StatCard
        icon={<Activity size={24} color={Colors.info} />}
        value={`${vaccineProgress.toFixed(0)}%`}
        label="Progresso"
        backgroundColor={Colors.infoLight}
      />
    </View>
  );
}

function StatCard({
  icon,
  value,
  label,
  backgroundColor,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  backgroundColor: string;
}) {
  return (
    <View style={[styles.statCard, { backgroundColor }]}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: (width - 44) / 2,
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
