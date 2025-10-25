import Colors from "@/constants/colors";
import { Link, Stack } from "expo-router";
import { Home } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Página não encontrada" }} />
      <View style={styles.container}>
        <Text style={styles.title}>404</Text>
        <Text style={styles.subtitle}>Página não encontrada</Text>
        <Text style={styles.description}>
          A página que procura não existe ou foi removida.
        </Text>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Home size={20} color="#FFFFFF" />
            <Text style={styles.buttonText}>Voltar ao Início</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 72,
    fontWeight: "700" as const,
    color: Colors.primary,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700" as const,
  },
});
