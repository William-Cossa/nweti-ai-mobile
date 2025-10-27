import Colors from "@/constants/colors";
import { Search } from "lucide-react-native";
import { StyleSheet, TextInput, View } from "react-native";

interface Props {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Search size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Pesquisar dicas..."
          placeholderTextColor={Colors.textSecondary}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
});
