import {
  CategoryFilter,
  CategoryFilterList,
} from "@/components/health-tips/CategoryFilterList";
import { EmptyState } from "@/components/health-tips/EmptyState";
import { HealthTipCard } from "@/components/health-tips/HealthTipCard";
import { SearchBar } from "@/components/health-tips/SearchBar";
import Colors from "@/constants/colors";
import { HEALTH_TIPS } from "@/mocks/healthTips";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CATEGORIES = [
  { id: "all" as const, label: "Todas", color: Colors.primary },
  { id: "pregnancy" as const, label: "Gravidez", color: "#E91E63" },
  { id: "infant" as const, label: "Bebé", color: "#9C27B0" },
  { id: "nutrition" as const, label: "Nutrição", color: "#FF9800" },
  { id: "development" as const, label: "Desenvolvimento", color: "#4CAF50" },
  { id: "safety" as const, label: "Segurança", color: "#F44336" },
];

export default function HealthTipsScreen() {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTips = HEALTH_TIPS.filter((tip) => {
    const matchesCategory =
      selectedCategory === "all" || tip.category === selectedCategory;
    const matchesSearch =
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        <View>
          <CategoryFilterList
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={styles.contentContainer}
        >
          {filteredTips.length === 0 ? (
            <EmptyState />
          ) : (
            filteredTips.map((tip) => {
              const cat = CATEGORIES.find((c) => c.id === tip.category);
              return (
                <HealthTipCard
                  key={tip.id}
                  tip={tip}
                  color={cat?.color || Colors.primary}
                  label={cat?.label || ""}
                />
              );
            })
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { flex: 1 },
  contentContainer: { padding: 16 },
});
