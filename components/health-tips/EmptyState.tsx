import Colors from "@/constants/colors";
import { Filter } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

export function EmptyState() {
  return (
    <View style={styles.container}>
      <Filter size={48} color={Colors.textLight} />
      <Text style={styles.title}>Nenhuma dica encontrada</Text>
      <Text style={styles.subtitle}>Tente ajustar os filtros ou pesquisa</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: "center",
  },
});
