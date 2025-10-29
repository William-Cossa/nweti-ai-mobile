import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { useState } from "react";
import SwitchChildModal from "./SwitchChildModal";
import { Baby } from "lucide-react-native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ChildHeader() {
  const { selectedChild, children } = useChild();
  const [modalVisible, setModalVisible] = useState(false);

  const getChildAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    const months =
      (today.getFullYear() - birthDate.getFullYear()) * 12 +
      today.getMonth() -
      birthDate.getMonth();
    if (months < 12) return `${months} ${months === 1 ? "mês" : "meses"}`;
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0)
      return `${years} ${years === 1 ? "ano" : "anos"}`;
    return `${years}a ${remainingMonths}m`;
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.childInfo}>
          <View style={styles.childAvatar}>
            <Baby size={32} color={Colors.primary} />
          </View>
          <View style={styles.childDetails}>
            <Text style={styles.childName}>{selectedChild.name}</Text>
            <Text style={styles.childAge}>
              {getChildAge(selectedChild.dateOfBirth)}
            </Text>
          </View>
        </View>
        {children.length > 1 && (
          <TouchableOpacity
            style={styles.switchButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.switchButtonText}>Trocar</Text>
          </TouchableOpacity>
        )}
      </View>
      <SwitchChildModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  childInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  childDetails: { gap: 4 },
  childName: { fontSize: 20, fontWeight: "700", color: Colors.text },
  childAge: { fontSize: 14, color: Colors.textSecondary },
  switchButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  switchButtonText: { color: Colors.primary, fontSize: 14, fontWeight: "600" },
});
