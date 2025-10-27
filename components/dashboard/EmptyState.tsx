import Colors from "@/constants/colors";
import { AlertCircle } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

interface EmptyStateProps {
  message: string;
  subMessage?: string;
}

export default function EmptyState({ message, subMessage }: EmptyStateProps) {
  return (
    <View style={styles.container}>
      <AlertCircle size={48} color={Colors.textLight} />
      <Text style={styles.title}>{message}</Text>
      {subMessage && <Text style={styles.text}>{subMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
