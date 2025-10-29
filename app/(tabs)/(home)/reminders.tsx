import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { useRouter } from "expo-router";
import {
  Activity,
  Bell,
  Calendar,
  CheckCircle,
  Circle,
  Clock,
  Pill,
  Plus,
  Syringe,
  Trash2,
} from "lucide-react-native";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Spinner } from "@/components/ui/spinner";

export default function RemindersScreen() {
  const {
    selectedChild,
    getChildReminders,
    isLoading,
    isDeletingReminder,
    deleteReminder,
    updateReminder,
    isUpdatingReminder,
  } = useChild();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const reminders = selectedChild ? getChildReminders(selectedChild.id) : [];

  const [filter, setFilter] = useState<"all" | "pending" | "completed">("all");

  if (isLoading || isDeletingReminder || isUpdatingReminder) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Spinner color={Colors.primary} />
        {/* <Text style={styles.loadingText}>A carregar lembretes...</Text> */}
      </SafeAreaView>
    );
  }

  const filteredReminders = reminders.filter((reminder: any) => {
    if (filter === "pending") return !reminder.isCompleted;
    if (filter === "completed") return reminder.isCompleted;
    return true;
  });

  const upcomingReminders = filteredReminders.filter(
    (r: any) => new Date(r.dateTime) >= new Date() && !r.isCompleted
  );
  const overdueReminders = filteredReminders.filter(
    (r: any) => new Date(r.dateTime) < new Date() && !r.isCompleted
  );
  const completedReminders = filteredReminders.filter(
    (r: any) => r.isCompleted
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "medication":
        return <Pill size={20} color={Colors.primary} />;
      case "appointment":
        return <Calendar size={20} color={Colors.info} />;
      case "vaccination":
        return <Syringe size={20} color={Colors.success} />;
      case "measurement":
        return <Activity size={20} color={Colors.warning} />;
      default:
        return <Bell size={20} color={Colors.textSecondary} />;
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      medication: "Medicação",
      appointment: "Consulta",
      vaccination: "Vacinação",
      measurement: "Medição",
      other: "Outro",
    };
    return labels[type] || type;
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const timeStr = date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (date.toDateString() === today.toDateString()) {
      return `Hoje às ${timeStr}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Amanhã às ${timeStr}`;
    } else {
      return `${date.toLocaleDateString("pt-PT")} às ${timeStr}`;
    }
  };

  const handleDelete = (id: string, title: string) => {
    Alert.alert(
      "Eliminar Lembrete",
      `Tem a certeza que deseja eliminar "${title}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => deleteReminder(id),
        },
      ]
    );
  };

  const renderReminder = (reminder: any) => (
    <View key={reminder.id} style={styles.reminderCard}>
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() =>
          updateReminder({
            id: reminder.id,
            reminder: { isCompleted: !reminder.isCompleted },
          })
        }
      >
        {reminder.isCompleted ? (
          <CheckCircle size={24} color={Colors.success} />
        ) : (
          <Circle size={24} color={Colors.textLight} />
        )}
      </TouchableOpacity>

      <View style={styles.reminderContent}>
        <View style={styles.reminderHeader}>
          <View style={styles.typeContainer}>
            {getTypeIcon(reminder.type)}
            <Text style={styles.typeLabel}>{getTypeLabel(reminder.type)}</Text>
          </View>
          {reminder.isRecurring && (
            <View style={styles.recurringBadge}>
              <Text style={styles.recurringText}>Recorrente</Text>
            </View>
          )}
        </View>

        <Text
          style={[
            styles.reminderTitle,
            reminder.isCompleted && styles.completedText,
          ]}
        >
          {reminder.title}
        </Text>

        {reminder.description && (
          <Text style={styles.reminderDescription}>{reminder.description}</Text>
        )}

        <View style={styles.reminderFooter}>
          <View style={styles.timeContainer}>
            <Clock size={14} color={Colors.textSecondary} />
            <Text style={styles.timeText}>
              {formatDateTime(reminder.dateTime)}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDelete(reminder.id, reminder.title)}
          >
            <Trash2 size={18} color={Colors.danger} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver os lembretes
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "all" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("all")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "all" && styles.filterTextActive,
              ]}
            >
              Todos ({reminders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "pending" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("pending")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "pending" && styles.filterTextActive,
              ]}
            >
              Pendentes ({upcomingReminders.length + overdueReminders.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === "completed" && styles.filterButtonActive,
            ]}
            onPress={() => setFilter("completed")}
          >
            <Text
              style={[
                styles.filterText,
                filter === "completed" && styles.filterTextActive,
              ]}
            >
              Concluídos ({completedReminders.length})
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
        >
          {overdueReminders.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Atrasados</Text>
              {overdueReminders.map(renderReminder)}
            </View>
          )}

          {upcomingReminders.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Próximos</Text>
              {upcomingReminders.map(renderReminder)}
            </View>
          )}

          {completedReminders.length > 0 && filter !== "pending" && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Concluídos</Text>
              {completedReminders.map(renderReminder)}
            </View>
          )}

          {filteredReminders.length === 0 && (
            <View style={styles.emptyState}>
              <Bell size={64} color={Colors.textLight} />
              <Text style={styles.emptyTitle}>Nenhum lembrete</Text>
              <Text style={styles.emptySubtitle}>
                Adicione lembretes para não perder nenhum compromisso
              </Text>
            </View>
          )}
        </ScrollView>

        <TouchableOpacity
          style={[styles.fab, { bottom: 16 + insets.bottom }]}
          onPress={() => router.push("/reminders/add" as any)}
        >
          <Plus size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 80,
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
  filterContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 8,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: Colors.background,
    alignItems: "center",
  },
  filterButtonActive: {
    backgroundColor: Colors.primary,
  },
  filterText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: "#FFFFFF",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 12,
  },
  reminderCard: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
    paddingTop: 2,
  },
  reminderContent: {
    flex: 1,
  },
  reminderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  typeLabel: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  recurringBadge: {
    backgroundColor: Colors.infoLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  recurringText: {
    fontSize: 10,
    fontWeight: "600" as const,
    color: Colors.info,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: Colors.textLight,
  },
  reminderDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  reminderFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700" as const,
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
