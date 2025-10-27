import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { useRouter } from "expo-router";
import {
  BarChart3,
  Bell,
  Calendar,
  Lightbulb,
  Pill,
  TrendingUp,
} from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const { width } = require("react-native").Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;

export default function QuickActions() {
  const router = useRouter();
  const {
    selectedChild,
    getChildGrowthRecords,
    getChildPrescriptions,
    getChildRecommendations,
    getChildReminders,
  } = useChild();

  const growthRecords = selectedChild ? getChildGrowthRecords() : [];
  const prescriptions = selectedChild
    ? getChildPrescriptions(selectedChild.id)
    : [];
  const recommendations = selectedChild
    ? getChildRecommendations(selectedChild.id)
    : [];
  const reminders = selectedChild ? getChildReminders(selectedChild.id) : [];

  const unreadRecommendations = recommendations.filter(
    (r: any) => !r.isRead
  ).length;
  const pendingReminders = reminders.filter(
    (r: any) => !r.isCompleted && new Date(r.dateTime) >= new Date()
  ).length;

  const actions = [
    {
      title: "Crescimento",
      subtitle: `${growthRecords.length} ${
        growthRecords.length === 1 ? "registo" : "registos"
      }`,
      icon: <TrendingUp size={24} color={Colors.primary} />,
      bgColor: Colors.primaryLight,
      onPress: () => router.push("/(tabs)/(home)/growth" as any),
    },
    {
      title: "Vacinas",
      subtitle: "Ver calendário",
      icon: <Calendar size={24} color={Colors.success} />,
      bgColor: Colors.successLight,
      onPress: () => router.push("/(tabs)/vaccinations" as any),
    },
    {
      title: "Prescrições",
      subtitle: `${prescriptions.length} ${
        prescriptions.length === 1 ? "activa" : "activas"
      }`,
      icon: <Pill size={24} color={Colors.warning} />,
      bgColor: Colors.warningLight,
      onPress: () => router.push("/(tabs)/(home)/prescriptions" as any),
    },
    {
      title: "Dicas",
      subtitle: "Recomendações",
      icon: <Lightbulb size={24} color={Colors.info} />,
      bgColor: Colors.infoLight,
      badge: unreadRecommendations,
      onPress: () => router.push("/(tabs)/(home)/recommendations" as any),
    },
    {
      title: "Lembretes",
      subtitle: `${pendingReminders} ${
        pendingReminders === 1 ? "pendente" : "pendentes"
      }`,
      icon: <Bell size={24} color={Colors.danger} />,
      bgColor: Colors.dangerLight,
      badge: pendingReminders,
      onPress: () => router.push("/(tabs)/(home)/reminders" as any),
    },
    {
      title: "Painel",
      subtitle: "Estatísticas",
      icon: <BarChart3 size={24} color={Colors.primary} />,
      bgColor: Colors.primaryLight,
      onPress: () => router.push("/(tabs)/(home)/dashboard" as any),
    },
  ];

  return (
    <View style={styles.quickActions}>
      {actions.map((action, index) => (
        <TouchableOpacity
          key={index}
          style={styles.actionCard}
          onPress={action.onPress}
        >
          <View
            style={[styles.actionIcon, { backgroundColor: action.bgColor }]}
          >
            {action.icon}
            {action.badge && action.badge > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{action.badge}</Text>
              </View>
            )}
          </View>
          <Text style={styles.actionTitle}>{action.title}</Text>
          <Text style={styles.actionSubtitle}>{action.subtitle}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  quickActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 24,
  },
  actionCard: {
    width: CARD_WIDTH,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  actionSubtitle: { fontSize: 12, color: Colors.textSecondary },
  badge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: Colors.danger,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 6,
  },
  badgeText: { color: "#FFFFFF", fontSize: 12, fontWeight: "700" },
});
