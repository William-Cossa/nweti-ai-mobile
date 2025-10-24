import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Reminder } from "@/types";
import { Stack, useRouter } from "expo-router";
import {
  Activity,
  Bell,
  Calendar,
  Clock,
  FileText,
  Pill,
  Syringe,
} from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddReminderScreen() {
  const router = useRouter();
  const { selectedChild, addReminder } = useChild();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Reminder["type"]>("other");
  const [date] = useState(new Date());
  const [time] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringPattern, setRecurringPattern] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  const reminderTypes: { value: Reminder["type"]; label: string; icon: any }[] =
    [
      { value: "medication", label: "Medicação", icon: Pill },
      { value: "appointment", label: "Consulta", icon: Calendar },
      { value: "vaccination", label: "Vacinação", icon: Syringe },
      { value: "measurement", label: "Medição", icon: Activity },
      { value: "other", label: "Outro", icon: FileText },
    ];

  const handleSave = () => {
    if (!title.trim() || !selectedChild) return;

    const dateTime = new Date(date);
    dateTime.setHours(time.getHours());
    dateTime.setMinutes(time.getMinutes());

    const newReminder: Reminder = {
      id: Date.now().toString(),
      childId: selectedChild.id,
      title: title.trim(),
      description: description.trim() || undefined,
      type,
      dateTime: dateTime.toISOString(),
      isCompleted: false,
      isRecurring,
      recurringPattern: isRecurring ? recurringPattern : undefined,
      notificationEnabled,
      createdAt: new Date().toISOString(),
    };

    addReminder(newReminder);
    router.back();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("pt-PT", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Novo Lembrete",
          headerStyle: { backgroundColor: Colors.surface },
          headerTintColor: Colors.primary,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={setTitle}
            placeholder="Ex: Dar medicamento"
            placeholderTextColor={Colors.textLight}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={description}
            onChangeText={setDescription}
            placeholder="Adicione detalhes sobre o lembrete"
            placeholderTextColor={Colors.textLight}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Tipo</Text>
          <View style={styles.typeGrid}>
            {reminderTypes.map((item) => {
              const Icon = item.icon;
              const isSelected = type === item.value;
              return (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.typeButton,
                    isSelected && styles.typeButtonActive,
                  ]}
                  onPress={() => setType(item.value)}
                >
                  <Icon
                    size={24}
                    color={isSelected ? Colors.primary : Colors.textSecondary}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      isSelected && styles.typeButtonTextActive,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Data</Text>
          <TouchableOpacity style={styles.dateTimeButton}>
            <Calendar size={20} color={Colors.primary} />
            <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Hora</Text>
          <TouchableOpacity style={styles.dateTimeButton}>
            <Clock size={20} color={Colors.primary} />
            <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>Lembrete recorrente</Text>
              <Text style={styles.hint}>
                Repetir este lembrete automaticamente
              </Text>
            </View>
            <Switch
              value={isRecurring}
              onValueChange={setIsRecurring}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={isRecurring ? Colors.primary : Colors.textLight}
            />
          </View>

          {isRecurring && (
            <View style={styles.recurringOptions}>
              {(["daily", "weekly", "monthly"] as const).map((pattern) => (
                <TouchableOpacity
                  key={pattern}
                  style={[
                    styles.recurringButton,
                    recurringPattern === pattern &&
                      styles.recurringButtonActive,
                  ]}
                  onPress={() => setRecurringPattern(pattern)}
                >
                  <Text
                    style={[
                      styles.recurringButtonText,
                      recurringPattern === pattern &&
                        styles.recurringButtonTextActive,
                    ]}
                  >
                    {pattern === "daily" && "Diariamente"}
                    {pattern === "weekly" && "Semanalmente"}
                    {pattern === "monthly" && "Mensalmente"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.switchRow}>
            <View style={styles.switchLabel}>
              <Text style={styles.label}>Notificações</Text>
              <Text style={styles.hint}>
                Receber alertas para este lembrete
              </Text>
            </View>
            <Switch
              value={notificationEnabled}
              onValueChange={setNotificationEnabled}
              trackColor={{ false: Colors.border, true: Colors.primaryLight }}
              thumbColor={
                notificationEnabled ? Colors.primary : Colors.textLight
              }
            />
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.saveButton,
            !title.trim() && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!title.trim()}
        >
          <Bell size={20} color="#FFFFFF" />
          <Text style={styles.saveButtonText}>Criar Lembrete</Text>
        </TouchableOpacity>
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
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 16,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  typeButton: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    gap: 8,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  typeButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  typeButtonText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  typeButtonTextActive: {
    color: Colors.primary,
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dateTimeText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: "600" as const,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    flex: 1,
  },
  recurringOptions: {
    flexDirection: "row",
    gap: 8,
    marginTop: 12,
  },
  recurringButton: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  recurringButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  recurringButtonText: {
    fontSize: 14,
    fontWeight: "600" as const,
    color: Colors.textSecondary,
  },
  recurringButtonTextActive: {
    color: "#FFFFFF",
  },
  saveButton: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 8,
  },
  saveButtonDisabled: {
    backgroundColor: Colors.textLight,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: "#FFFFFF",
  },
});
