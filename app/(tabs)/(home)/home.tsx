import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { HEALTH_TIPS } from "@/mocks/healthTips";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  Baby,
  BarChart3,
  Bell,
  Calendar,
  Lightbulb,
  Pill,
  Plus,
  TrendingUp,
} from "lucide-react-native";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const CARD_WIDTH = (width - 48) / 2;
const TIP_CARD_WIDTH = width - 80;

export default function HomeScreen() {
  const router = useRouter();
  const {
    selectedChild,
    children,
    getChildGrowthRecords,
    getChildPrescriptions,
    getChildRecommendations,
    getChildReminders,
  } = useChild();

  const growthRecords = selectedChild
    ? getChildGrowthRecords(selectedChild.id)
    : [];
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

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Baby size={64} color={Colors.textLight} />
        <Text style={styles.emptyTitle}>Nenhuma criança registada</Text>
        <Text style={styles.emptySubtitle}>
          Adicione o perfil da sua criança para começar a acompanhar o
          crescimento e saúde
        </Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => router.push("/child/add" as any)}
        >
          <LinearGradient
            colors={Colors.gradient.primary}
            style={styles.addButtonGradient}
          >
            <Plus size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Adicionar Criança</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }

  const latestGrowth = growthRecords[growthRecords.length - 1];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.tipsSection}>
        <View style={styles.tipsSectionHeader}>
          <Text style={styles.tipsTitle}>Dicas de Saúde</Text>
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/(home)/health-tips" as any)}
          >
            <Text style={styles.viewAllText}>Ver todas</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tipsScroll}
        >
          {HEALTH_TIPS.slice(0, 5).map((tip) => {
            const categoryColors: Record<string, string> = {
              pregnancy: "#E91E63",
              infant: "#9C27B0",
              nutrition: "#FF9800",
              development: "#4CAF50",
              safety: "#F44336",
            };
            const bgColor = categoryColors[tip.category] || Colors.primary;

            return (
              <TouchableOpacity
                key={tip.id}
                style={styles.tipCard}
                onPress={() => router.push("/(tabs)/(home)/health-tips" as any)}
              >
                <LinearGradient
                  colors={[bgColor, bgColor + "CC"]}
                  style={styles.tipBackground}
                >
                  <View style={styles.tipIconContainer}>
                    <Text style={styles.tipIcon}>📚</Text>
                  </View>
                </LinearGradient>
                <LinearGradient
                  colors={["transparent", "rgba(0,0,0,0.9)"]}
                  style={styles.tipGradient}
                >
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDescription} numberOfLines={2}>
                    {tip.description}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.header}>
        <View style={styles.childInfo}>
          <View style={styles.childAvatar}>
            <Baby size={32} color={Colors.primary} />
          </View>
          <View style={styles.childDetails}>
            <Text style={styles.childName}>{selectedChild.name}</Text>
            <Text style={styles.childAge}>
              {getChildAge(selectedChild.dateOfBirth)}
            </Text>
          </View>
        </View>
        {children.length > 1 && (
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => router.push("/child/select" as any)}
          >
            <Text style={styles.switchButtonText}>Trocar</Text>
          </TouchableOpacity>
        )}
      </View>

      {latestGrowth && (
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
      )}

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/(home)/growth" as any)}
        >
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.primaryLight },
            ]}
          >
            <TrendingUp size={24} color={Colors.primary} />
          </View>
          <Text style={styles.actionTitle}>Crescimento</Text>
          <Text style={styles.actionSubtitle}>
            {growthRecords.length}{" "}
            {growthRecords.length === 1 ? "registo" : "registos"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/vaccinations" as any)}
        >
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.successLight },
            ]}
          >
            <Calendar size={24} color={Colors.success} />
          </View>
          <Text style={styles.actionTitle}>Vacinas</Text>
          <Text style={styles.actionSubtitle}>Ver calendário</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/(home)/prescriptions" as any)}
        >
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.warningLight },
            ]}
          >
            <Pill size={24} color={Colors.warning} />
          </View>
          <Text style={styles.actionTitle}>Prescrições</Text>
          <Text style={styles.actionSubtitle}>
            {prescriptions.length}{" "}
            {prescriptions.length === 1 ? "activa" : "activas"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/(home)/recommendations" as any)}
        >
          <View
            style={[styles.actionIcon, { backgroundColor: Colors.infoLight }]}
          >
            <Lightbulb size={24} color={Colors.info} />
            {unreadRecommendations > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadRecommendations}</Text>
              </View>
            )}
          </View>
          <Text style={styles.actionTitle}>Dicas</Text>
          <Text style={styles.actionSubtitle}>Recomendações</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/(home)/reminders" as any)}
        >
          <View
            style={[styles.actionIcon, { backgroundColor: Colors.dangerLight }]}
          >
            <Bell size={24} color={Colors.danger} />
            {pendingReminders > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{pendingReminders}</Text>
              </View>
            )}
          </View>
          <Text style={styles.actionTitle}>Lembretes</Text>
          <Text style={styles.actionSubtitle}>
            {pendingReminders}{" "}
            {pendingReminders === 1 ? "pendente" : "pendentes"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push("/(tabs)/(home)/dashboard" as any)}
        >
          <View
            style={[
              styles.actionIcon,
              { backgroundColor: Colors.primaryLight },
            ]}
          >
            <BarChart3 size={24} color={Colors.primary} />
          </View>
          <Text style={styles.actionTitle}>Painel</Text>
          <Text style={styles.actionSubtitle}>Estatísticas</Text>
        </TouchableOpacity>
      </View>

      {!latestGrowth && (
        <View style={styles.promptCard}>
          <TrendingUp size={32} color={Colors.primary} />
          <Text style={styles.promptTitle}>Adicione a primeira medição</Text>
          <Text style={styles.promptSubtitle}>
            Comece a acompanhar o crescimento do seu filho
          </Text>
          <TouchableOpacity
            style={styles.promptButton}
            onPress={() => router.push("/(tabs)/(home)/growth" as any)}
          >
            <Text style={styles.promptButtonText}>Adicionar Medição</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.background,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 24,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  addButton: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    gap: 8,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700" as const,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  childInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  childDetails: {
    gap: 4,
  },
  childName: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  childAge: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  switchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  switchButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600" as const,
  },
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
  statsGradient: {
    padding: 20,
  },
  statsTitle: {
    fontSize: 16,
    fontWeight: "600" as const,
    color: "#FFFFFF",
    opacity: 0.9,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 32,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    backgroundColor: "#FFFFFF",
    opacity: 0.3,
  },
  statsDate: {
    fontSize: 12,
    color: "#FFFFFF",
    opacity: 0.8,
    textAlign: "center",
  },
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
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
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
  badgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700" as const,
  },
  promptCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  promptTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  promptSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 20,
  },
  promptButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  promptButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600" as const,
  },
  tipsSection: {
    marginBottom: 24,
  },
  tipsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.primary,
  },
  tipsScroll: {
    paddingRight: 16,
  },
  tipCard: {
    width: TIP_CARD_WIDTH,
    height: 180,
    borderRadius: 16,
    marginRight: 16,
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tipBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  tipIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  tipIcon: {
    fontSize: 48,
  },
  tipGradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    justifyContent: "flex-end",
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: "#FFFFFF",
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: "#FFFFFF",
    opacity: 0.9,
    lineHeight: 20,
  },
});
