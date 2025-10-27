import Colors from "@/constants/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Tip {
  id: string;
  title: string;
  description: string;
  category: string;
}

interface Props {
  tip: Tip;
  color: string;
  label: string;
}

export function HealthTipCard({ tip, color, label }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imagePlaceholder}>
        <View style={[styles.emojiContainer, { backgroundColor: color }]}>
          <Text style={{ fontSize: 32 }}>📚</Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>{tip.title}</Text>
          <View style={[styles.badge, { backgroundColor: color }]}>
            <Text style={styles.badgeText}>{label}</Text>
          </View>
        </View>
        <Text style={styles.description}>{tip.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  imagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  emojiContainer: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    borderRadius: 60,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 12,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    lineHeight: 24,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#FFF",
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
});
