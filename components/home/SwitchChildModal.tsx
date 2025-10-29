import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";

import { X } from "lucide-react-native";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function SwitchChildModal({ visible, onClose }: Props) {
  const { children, setSelectedChildId, selectedChild } = useChild();

  const handleSelectChild = (childId: string) => {
    setSelectedChildId(childId);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Trocar de Criança</Text>
            <TouchableOpacity onPress={onClose}>
              <X size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={children}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.childItem,
                  item.id === selectedChild.id && styles.selectedChildItem,
                ]}
                onPress={() => handleSelectChild(item.id)}
              >
                <Text style={styles.childName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    width: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  modalTitle: { fontSize: 24, fontWeight: "700", color: Colors.text },
  childItem: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: Colors.background,
    marginBottom: 12,
  },
  selectedChildItem: {
    backgroundColor: Colors.primaryLight,
  },
  childName: { fontSize: 18, fontWeight: "600", color: Colors.text },
});
