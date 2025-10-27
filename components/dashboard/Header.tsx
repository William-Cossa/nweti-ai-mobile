import Colors from "@/constants/colors";
import { StyleSheet, Text, View } from "react-native";

interface HeaderProps {
  childName: string;
  childAge: string;
}

export default function Header({ childName, childAge }: HeaderProps) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Painel de Controlo</Text>
      <Text style={styles.headerSubtitle}>
        {childName} • {childAge}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
});
