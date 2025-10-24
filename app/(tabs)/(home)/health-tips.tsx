import Colors from "@/constants/colors";
import { HEALTH_TIPS } from "@/mocks/healthTips";
import { Filter, Search } from "lucide-react-native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type CategoryFilter =
  | "all"
  | "pregnancy"
  | "infant"
  | "nutrition"
  | "development"
  | "safety";

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
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color={Colors.textSecondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Pesquisar dicas..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesScroll}
        style={styles.categoriesContainer}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && {
                backgroundColor: category.color,
              },
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
      >
        {filteredTips.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Filter size={48} color={Colors.textLight} />
            <Text style={styles.emptyTitle}>Nenhuma dica encontrada</Text>
            <Text style={styles.emptySubtitle}>
              Tente ajustar os filtros ou pesquisa
            </Text>
          </View>
        ) : (
          filteredTips.map((tip) => (
            <TouchableOpacity key={tip.id} style={styles.tipCard}>
              <View style={styles.tipImagePlaceholder}>
                <View
                  style={[
                    styles.categoryBadge,
                    {
                      backgroundColor:
                        CATEGORIES.find((c) => c.id === tip.category)?.color ||
                        Colors.primary,
                      paddingHorizontal: 24,
                      paddingVertical: 24,
                      borderRadius: 60,
                    },
                  ]}
                >
                  <Text style={{ fontSize: 32 }}>📚</Text>
                </View>
              </View>
              <View style={styles.tipContent}>
                <View style={styles.tipHeader}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <View
                    style={[
                      styles.categoryBadge,
                      {
                        backgroundColor:
                          CATEGORIES.find((c) => c.id === tip.category)
                            ?.color || Colors.primary,
                      },
                    ]}
                  >
                    <Text style={styles.categoryBadgeText}>
                      {CATEGORIES.find((c) => c.id === tip.category)?.label}
                    </Text>
                  </View>
                </View>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: 16,
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  categoriesContainer: {
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  categoriesScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 8,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: "700" as const,
    color: Colors.textSecondary,
  },
  categoryTextActive: {
    color: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  tipCard: {
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
  tipImage: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primaryLight,
  },
  tipImagePlaceholder: {
    width: "100%",
    height: 200,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  tipContent: {
    padding: 16,
  },
  tipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 12,
  },
  tipTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    lineHeight: 24,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: "600" as const,
    color: "#FFFFFF",
  },
  tipDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 18,
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
});
