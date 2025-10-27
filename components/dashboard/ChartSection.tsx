import Colors from "@/constants/colors";
import { TrendingUp } from "lucide-react-native";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";

const { width } = Dimensions.get("window");
const CHART_WIDTH = width - 32;

interface ChartSectionProps {
  title: string;
  dataKey: "weight" | "height";
  growthRecords: any[];
  color: string;
}

export default function ChartSection({
  title,
  dataKey,
  growthRecords,
  color,
}: ChartSectionProps) {
  const data = {
    labels: growthRecords.slice(-6).map((r: any) => {
      const date = new Date(r.date);
      return `${date.getMonth() + 1}/${date
        .getFullYear()
        .toString()
        .slice(-2)}`;
    }),
    datasets: [
      {
        data: growthRecords.slice(-6).map((r: any) => r[dataKey]),
        color: (opacity = 1) =>
          `${color}${Math.round(opacity * 255).toString(16)}`,
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundColor: Colors.surface,
    backgroundGradientFrom: Colors.surface,
    backgroundGradientTo: Colors.surface,
    decimalPlaces: 1,
    color: (opacity = 1) => color,
    labelColor: (opacity = 1) => `rgba(107, 114, 128, ${opacity})`,
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: color,
    },
  };

  return (
    <View style={styles.chartSection}>
      <View style={styles.chartHeader}>
        <TrendingUp size={20} color={color} />
        <Text style={styles.chartTitle}>{title}</Text>
      </View>
      <LineChart
        data={data}
        width={CHART_WIDTH}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
        withInnerLines={false}
        withOuterLines={true}
        withVerticalLabels
        withHorizontalLabels
      />
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
  chart: { borderRadius: 16, marginVertical: 8 },
});
