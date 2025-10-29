import Colors from "@/constants/colors";
import { useAuth } from "@/contexts/AuthContext";
import { useChild } from "@/contexts/ChildContext";
import { useRouter } from "expo-router";
import { Baby, Heart, LogOut, Settings, User } from "lucide-react-native";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { children } = useChild();

  const handleLogout = () => {
    Alert.alert("Terminar Sessão", "Tem a certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await logout();
          router.replace("/auth/login" as any);
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <TouchableOpacity
          style={styles.header}
          onPress={() => router.push("/auth/edit-profile" as any)}
        >
          <View style={styles.avatar}>
            <User size={48} color={Colors.primary} />
          </View>
          <Text style={styles.name}>{user?.name}</Text>
          <Text style={styles.email}>{user?.email}</Text>
          {user?.phone && <Text style={styles.phone}>{user.phone}</Text>}
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crianças Registadas</Text>
          {children.length === 0 ? (
            <View style={styles.emptyChildren}>
              <Baby size={32} color={Colors.textLight} />
              <Text style={styles.emptyText}>Nenhuma criança registada</Text>
            </View>
          ) : (
            children.map((child: any) => (
              <TouchableOpacity
                key={child.id}
                style={styles.childCard}
                onPress={() => router.push(`/child/${child.id}` as any)}
              >
                <View style={styles.childAvatar}>
                  <Baby size={24} color={Colors.primary} />
                </View>
                <View style={styles.childInfo}>
                  <Text style={styles.childName}>{child.name}</Text>
                  <Text style={styles.childDetails}>
                    {new Date(child.dateOfBirth).toLocaleDateString("pt-PT")}
                  </Text>
                </View>
              </TouchableOpacity>
            ))
          )}
          <TouchableOpacity
            style={styles.addChildButton}
            onPress={() => router.push("/child/add" as any)}
          >
            <Text style={styles.addChildText}>+ Adicionar Criança</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configurações</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/profile/settings" as any)}
          >
            <Settings size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Definições</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Heart size={24} color={Colors.textSecondary} />
            <Text style={styles.menuText}>Sobre a Aplicação</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <LogOut size={24} color={Colors.danger} />
            <Text style={[styles.menuText, styles.logoutText]}>
              Terminar Sessão
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.version}>Versão 1.0.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
  },
  header: {
    alignItems: "center",
    paddingVertical: 32,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  phone: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  section: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 16,
  },
  emptyChildren: {
    alignItems: "center",
    paddingVertical: 24,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 8,
  },
  childCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: Colors.background,
    borderRadius: 12,
    marginBottom: 8,
  },
  childAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  childInfo: {
    flex: 1,
  },
  childName: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.text,
    marginBottom: 4,
  },
  childDetails: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  addChildButton: {
    marginTop: 8,
    padding: 16,
    backgroundColor: Colors.primaryLight,
    borderRadius: 12,
    alignItems: "center",
  },
  addChildText: {
    fontSize: 16,
    fontWeight: "700" as const,
    color: Colors.primary,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  menuText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 16,
    flex: 1,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: Colors.danger,
    fontWeight: "600" as const,
  },
  version: {
    fontSize: 12,
    color: Colors.textLight,
    textAlign: "center",
    marginTop: 16,
    marginBottom: 32,
  },
});
