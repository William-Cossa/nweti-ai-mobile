import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Stack } from "expo-router";
import { Bot, Send, User as UserIcon } from "lucide-react-native";
import { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; text: string }[]
  >([]);
  const scrollViewRef = useRef<ScrollView>(null);
  const { selectedChild, addRecommendation } = useChild();

  const handleSend = () => {
    if (!input.trim()) return;

    const context = selectedChild
      ? `Contexto: Estou a falar sobre ${selectedChild.name}, ${
          selectedChild.gender === "male" ? "menino" : "menina"
        } com ${getChildAge(selectedChild.dateOfBirth)}. `
      : "";

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      text: context + input,
    };

    // Simula resposta do "assistente"
    const assistantMessage = {
      id: (Date.now() + 1).toString(),
      role: "assistant" as const,
      text: "Esta é uma resposta automática. Substitua com sua lógica de AI.",
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
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

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <>
      <Stack.Screen options={{ title: "Assistente de Saúde" }} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages.length === 0 && (
            <View style={styles.emptyState}>
              <Bot size={64} color={Colors.primary} />
              <Text style={styles.emptyTitle}>Assistente de Saúde IA</Text>
              <Text style={styles.emptySubtitle}>
                Faça perguntas sobre gravidez, alimentação, vacinação e cuidados
                infantis
              </Text>
              <View style={styles.suggestionsContainer}>
                <TouchableOpacity
                  style={styles.suggestionChip}
                  onPress={() =>
                    setInput("Quando devo introduzir alimentos sólidos?")
                  }
                >
                  <Text style={styles.suggestionText}>Alimentação</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestionChip}
                  onPress={() =>
                    setInput("Quais são os sinais de febre em bebés?")
                  }
                >
                  <Text style={styles.suggestionText}>Sintomas</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.suggestionChip}
                  onPress={() =>
                    setInput("Como estabelecer uma rotina de sono?")
                  }
                >
                  <Text style={styles.suggestionText}>Sono</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {messages.map((message) => (
            <View
              key={message.id}
              style={[
                styles.messageContainer,
                message.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage,
              ]}
            >
              <View style={styles.messageHeader}>
                {message.role === "user" ? (
                  <UserIcon size={20} color={Colors.primary} />
                ) : (
                  <Bot size={20} color={Colors.success} />
                )}
                <Text style={styles.messageRole}>
                  {message.role === "user" ? "Você" : "Assistente"}
                </Text>
              </View>
              <Text style={styles.messageText}>{message.text}</Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Faça uma pergunta..."
            placeholderTextColor={Colors.textLight}
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !input.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!input.trim()}
          >
            <Send
              size={20}
              color={input.trim() ? "#FFFFFF" : Colors.textLight}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  messagesContainer: { flex: 1 },
  messagesContent: { padding: 16 },
  emptyState: { alignItems: "center", paddingVertical: 48 },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    paddingHorizontal: 32,
    marginBottom: 24,
  },
  suggestionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  suggestionChip: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  suggestionText: { color: Colors.primary, fontSize: 14, fontWeight: "600" },
  messageContainer: { marginBottom: 16, padding: 12, borderRadius: 12 },
  userMessage: {
    backgroundColor: Colors.primaryLight,
    alignSelf: "flex-end",
    maxWidth: "80%",
  },
  assistantMessage: {
    backgroundColor: Colors.surface,
    alignSelf: "flex-start",
    maxWidth: "80%",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  messageHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  messageRole: { fontSize: 12, fontWeight: "700", color: Colors.textSecondary },
  messageText: { fontSize: 16, color: Colors.text, lineHeight: 24 },
  inputContainer: {
    flexDirection: "row",
    padding: 16,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
    gap: 12,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: { backgroundColor: Colors.borderLight },
});
