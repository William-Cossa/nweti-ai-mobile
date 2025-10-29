import Colors from "@/constants/colors";
import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";

export type CategoryFilter =
  | "all"
  | "pregnancy"
  | "infant"
  | "nutrition"
  | "development"
  | "safety";

interface Category {
  id: CategoryFilter;
  label: string;
  color: string;
}

interface Props {
  categories: Category[];
  selected: CategoryFilter;
  onSelect: (category: CategoryFilter) => void;
}

export function CategoryFilterList({ categories, selected, onSelect }: Props) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scroll}
      style={styles.container}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.chip,
            selected === category.id && { backgroundColor: category.color },
          ]}
          onPress={() => onSelect(category.id)}
        >
          <Text
            style={[styles.text, selected === category.id && styles.textActive]}
          >
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8, // a
    backgroundColor: Colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  scroll: {
    paddingHorizontal: 16,
    // paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    borderWidth: 2,
    borderColor: Colors.border,
    marginRight: 8,
  },
  text: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.textSecondary,
  },
  textActive: {
    color: "#FFFFFF",
  },
});
