import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import {
  Activity,
  Brain,
  Heart,
  Lightbulb,
  Moon,
  Utensils,
} from "lucide-react-native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function RecommendationsScreen() {
  const { selectedChild, getChildRecommendations, markRecommendationRead } =
    useChild();
  const recommendations = selectedChild
    ? getChildRecommendations(selectedChild.id)
    : [];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "nutrition":
        return <Utensils size={24} color={Colors.warning} />;
      case "sleep":
        return <Moon size={24} color={Colors.info} />;
      case "hygiene":
        return <Heart size={24} color={Colors.danger} />;
      case "activity":
        return <Activity size={24} color={Colors.success} />;
      case "development":
        return <Brain size={24} color={Colors.primary} />;
      default:
        return <Lightbulb size={24} color={Colors.textSecondary} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "nutrition":
        return Colors.warningLight;
      case "sleep":
        return Colors.infoLight;
      case "hygiene":
        return Colors.dangerLight;
      case "activity":
        return Colors.successLight;
      case "development":
        return Colors.primaryLight;
      default:
        return Colors.background;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: Colors.danger,
      medium: Colors.warning,
      low: Colors.success,
    };
    const labels = {
      high: "Alta",
      medium: "Média",
      low: "Baixa",
    };
    return {
      color: colors[priority as keyof typeof colors],
      label: labels[priority as keyof typeof labels],
    };
  };

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver as recomendações
        </Text>
      </View>
    );
  }

  if (recommendations.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Lightbulb size={64} color={Colors.textLight} />
        <Text style={styles.emptyTitle}>Nenhuma recomendação</Text>
        <Text style={styles.emptySubtitle}>
          Use o assistente IA para receber dicas personalizadas
        </Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recomendações</Text>
        <Text style={styles.headerSubtitle}>
          Dicas personalizadas para o seu filho
        </Text>
      </View>

      {recommendations.map((rec: any) => {
        const priorityBadge = getPriorityBadge(rec.priority);
        return (
          <TouchableOpacity
            key={rec.id}
            style={[
              styles.recommendationCard,
              { backgroundColor: getCategoryColor(rec.category) },
              !rec.isRead && styles.unreadCard,
            ]}
            onPress={() => markRecommendationRead(rec.id)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconContainer}>
                {getCategoryIcon(rec.category)}
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  { backgroundColor: priorityBadge.color },
                ]}
              >
                <Text style={styles.priorityText}>{priorityBadge.label}</Text>
              </View>
            </View>
            <Text style={styles.recommendationTitle}>{rec.title}</Text>
            <Text style={styles.recommendationDescription}>
              {rec.description}
            </Text>
            <Text style={styles.recommendationDate}>
              {new Date(rec.createdAt).toLocaleDateString("pt-PT")}
            </Text>
            {!rec.isRead && (
              <View style={styles.unreadIndicator}>
                <Text style={styles.unreadText}>Nova</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
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
  emptyText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  recommendationCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadCard: {
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "700" as const,
  },
  recommendationTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  recommendationDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  recommendationDate: {
    fontSize: 12,
    color: Colors.textLight,
  },
  unreadIndicator: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: Colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  unreadText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700" as const,
  },
});
