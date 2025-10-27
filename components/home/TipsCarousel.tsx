import Colors from "@/constants/colors";
import { HEALTH_TIPS } from "@/mocks/healthTips";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = require("react-native").Dimensions.get("window");
const TIP_CARD_WIDTH = width - 80;

export default function TipsCarousel() {
  const router = useRouter();

  return (
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
  );
}

const styles = StyleSheet.create({
  tipsSection: { marginBottom: 24 },
  tipsSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  tipsTitle: { fontSize: 20, fontWeight: "700", color: Colors.text },
  viewAllText: { fontSize: 14, fontWeight: "600", color: Colors.primary },
  tipsScroll: { paddingRight: 16 },
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
  tipIcon: { fontSize: 48 },
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
    fontWeight: "700",
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
