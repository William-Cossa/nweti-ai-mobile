import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Reminder } from "@/types";
import { Stack, useRouter } from "expo-router";
import {
  Activity,
  Bell,
  Calendar,
  FileText,
  Pill,
  Syringe,
} from "lucide-react-native";

import { DatePicker } from "@/components/ui/date-picker";
import { Spinner } from "@/components/ui/spinner";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// Pedir permissão ao iniciar o app
const requestNotificationPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    alert("Permissões de notificações não concedidas!");
  }
};

export default function AddReminderScreen() {
  const router = useRouter();
  const { selectedChild, addReminder, isAddingReminder } = useChild();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState<Reminder["type"]>("other");
  const [dateTime, setDateTime] = useState<Date | undefined>(new Date());

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
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Permissões de notificações não concedidas!");
      }
    };
    requestPermissions();
  }, []);
  const getFriendlyMessage = (
    type: Reminder["type"],
    title: string,
    description?: string
  ) => {
    switch (type) {
      case "medication":
        return `Hora de tomar a tua medicação: ${title}. Cuida da tua saúde!`;
      case "appointment":
        return `Não te esqueças da consulta: ${title}. Prepara-te com antecedência!`;
      case "vaccination":
        return `Hoje tens vacinação: ${title}. Mantenha a tua imunização em dia!`;
      case "measurement":
        return `É hora da medição: ${title}. Regista os teus resultados!`;
      case "other":
      default:
        return `Lembrete: ${title}${description ? " - " + description : ""}`;
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !selectedChild) return;

    const newReminder: Partial<Reminder> = {
      childId: selectedChild.id,
      title: title.trim(),
      description: description.trim() || undefined,
      type,
      dateTime: dateTime!.toISOString(),
      isRecurring,
      recurringPattern: isRecurring ? recurringPattern : undefined,
      notificationEnabled,
    };
    let friendlyMessage = getFriendlyMessage(
      type,
      title.trim(),
      description.trim()
    );
    if (notificationEnabled) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: title.trim(),
          body: friendlyMessage,
          sound: "default",
        },
        trigger: {
          type: "date",
          date: dateTime!, // a tua data
        } as Notifications.DateTriggerInput,
      });
    }

    addReminder(newReminder, {
      onSuccess: () => {
        router.back();
      },
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
          <Text style={styles.label}>Data e Hora</Text>
          <DatePicker
            label="Date & Time"
            mode="datetime"
            value={dateTime}
            onChange={setDateTime}
            minimumDate={new Date()}
            placeholder="Seleciona a hora e a data"
            timeFormat="24"
          />
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
            (!title.trim() || isAddingReminder) && styles.saveButtonDisabled,
          ]}
          onPress={handleSave}
          disabled={!title.trim() || isAddingReminder}
        >
          {isAddingReminder ? (
            <Spinner />
          ) : (
            <>
              <Bell size={20} color="#FFFFFF" />
              <Text style={styles.saveButtonText}>Criar Lembrete</Text>
            </>
          )}
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
