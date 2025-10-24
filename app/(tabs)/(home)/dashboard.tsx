import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { VACCINES } from "@/mocks/vaccines";
import { Stack } from "expo-router";
import {
  Activity,
  AlertCircle,
  Calendar,
  CheckCircle,
  Pill,
  TrendingUp,
} from "lucide-react-native";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 32;

export default function DashboardScreen() {
  const {
    selectedChild,
    getChildGrowthRecords,
    getChildVaccinations,
    getChildPrescriptions,
  } = useChild();

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver o painel
        </Text>
      </View>
    );
  }

  const growthRecords = getChildGrowthRecords(selectedChild.id);
  const vaccinations = getChildVaccinations(selectedChild.id);
  const prescriptions = getChildPrescriptions(selectedChild.id);

  const completedVaccines = vaccinations.filter(
    (v: any) => v.status === "completed"
  ).length;
  const totalVaccines = VACCINES.length;
  const vaccineProgress =
    totalVaccines > 0 ? (completedVaccines / totalVaccines) * 100 : 0;

  const weightData = {
    labels: growthRecords.slice(-6).map((r: any) => {
      const date = new Date(r.date);
      return `${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
    }),
    datasets: [
      {
        data: growthRecords.slice(-6).map((r: any) => r.weight),
        color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const heightData = {
    labels: growthRecords.slice(-6).map((r: any) => {
      const date = new Date(r.date);
      return `${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
    }),
    datasets: [
      {
        data: growthRecords.slice(-6).map((r: any) => r.height),
        color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.surface,
    backgroundGradientFrom: Colors.surface,
    backgroundGradientTo: Colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: Colors.primary,
    },
  };

  const getChildAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      today.getMonth() -
      birthDate.getMonth();

    if (months < 12) {
      return `${months} ${months === 1 ? "mês" : "meses"}`;
    }
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? "ano" : "anos"}`;
    }
    return `${years}a ${remainingMonths}m`;
  };

  return (
    <>
      <Stack.Screen options={{ title: "Painel de Controlo" }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Painel de Controlo</Text>
          <Text style={styles.headerSubtitle}>
            {selectedChild.name} • {getChildAge(selectedChild.dateOfBirth)}
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View
            style={[styles.statCard, { backgroundColor: Colors.primaryLight }]}
          >
            <View style={styles.statIcon}>
              <TrendingUp size={24} color={Colors.primary} />
            </View>
            <Text style={styles.statValue}>{growthRecords.length}</Text>
            <Text style={styles.statLabel}>Medições</Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: Colors.successLight }]}
          >
            <View style={styles.statIcon}>
              <CheckCircle size={24} color={Colors.success} />
            </View>
            <Text style={styles.statValue}>
              {completedVaccines}/{totalVaccines}
            </Text>
            <Text style={styles.statLabel}>Vacinas</Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: Colors.warningLight }]}
          >
            <View style={styles.statIcon}>
              <Pill size={24} color={Colors.warning} />
            </View>
            <Text style={styles.statValue}>{prescriptions.length}</Text>
            <Text style={styles.statLabel}>Prescrições</Text>
          </View>

          <View
            style={[styles.statCard, { backgroundColor: Colors.infoLight }]}
          >
            <View style={styles.statIcon}>
              <Activity size={24} color={Colors.info} />
            </View>
            <Text style={styles.statValue}>{vaccineProgress.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>Progresso</Text>
          </View>
        </View>

        {growthRecords.length >= 2 ? (
          <>
            <View style={styles.chartSection}>
              <View style={styles.chartHeader}>
                <TrendingUp size={20} color={Colors.primary} />
                <Text style={styles.chartTitle}>Evolução do Peso (kg)</Text>
              </View>
              <LineChart
                data={weightData}
                width={CHART_WIDTH}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
              />
            </View>

            <View style={styles.chartSection}>
              <View style={styles.chartHeader}>
                <TrendingUp size={20} color={Colors.success} />
                <Text style={styles.chartTitle}>Evolução da Altura (cm)</Text>
              </View>
              <LineChart
                data={heightData}
                width={CHART_WIDTH}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(16, 185, 129, ${opacity})`,
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: Colors.success,
                  },
                }}
                bezier
                style={styles.chart}
                withInnerLines={false}
                withOuterLines={true}
                withVerticalLabels={true}
                withHorizontalLabels={true}
              />
            </View>

            <View style={styles.chartSection}>
              <View style={styles.chartHeader}>
                <Calendar size={20} color={Colors.info} />
                <Text style={styles.chartTitle}>Progresso de Vacinação</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View
                    style={[
                      styles.progressFill,
                      { width: `${vaccineProgress}%` },
                    ]}
                  />
                </View>
                <Text style={styles.progressText}>
                  {completedVaccines} de {totalVaccines} vacinas aplicadas
                </Text>
              </View>
            </View>

            {growthRecords.length > 0 && (
              <View style={styles.summaryCard}>
                <Text style={styles.summaryTitle}>Última Medição</Text>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Peso</Text>
                    <Text style={styles.summaryValue}>
                      {growthRecords[growthRecords.length - 1].weight} kg
                    </Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Altura</Text>
                    <Text style={styles.summaryValue}>
                      {growthRecords[growthRecords.length - 1].height} cm
                    </Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Data</Text>
                    <Text style={styles.summaryValue}>
                      {new Date(
                        growthRecords[growthRecords.length - 1].date
                      ).toLocaleDateString("pt-PT", {
                        day: "2-digit",
                        month: "short",
                      })}
                    </Text>
                  </View>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyChartContainer}>
            <AlertCircle size={48} color={Colors.textLight} />
            <Text style={styles.emptyChartTitle}>Dados Insuficientes</Text>
            <Text style={styles.emptyChartText}>
              Adicione pelo menos 2 medições de crescimento para visualizar os
              gráficos
            </Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
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
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  chartSection: {
    marginBottom: 24,
  },
  chartHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
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
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  summaryItem: {
    alignItems: "center",
  },
  summaryLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: Colors.border,
  },
  emptyChartContainer: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 40,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyChartTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyChartText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
