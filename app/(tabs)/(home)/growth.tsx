import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { Plus } from "lucide-react-native";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  AddGrowthModal,
  CurrentStats,
  GrowthHistory,
} from "@/components/Growth";

export default function GrowthScreen() {
  const {
    selectedChild,
    getChildGrowthRecords,
    addGrowthRecord,
    isLoading,
    isAddingGrowthRecord,
  } = useChild();
  const growthRecords = selectedChild ? getChildGrowthRecords() : [];
  const [modalVisible, setModalVisible] = useState(false);

  if (isLoading) {
    return <Spinner />;
  }

  if (!selectedChild) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Selecione uma criança para ver o crescimento
        </Text>
      </View>
    );
  }

  const latestRecord = growthRecords[growthRecords.length - 1];

  const handleAddRecord = (weight: number, height: number, notes: string) => {
    if (selectedChild) {
      addGrowthRecord({
        childId: selectedChild.id,
        weight,
        height,
        notes,
      });
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        {latestRecord && (
          <CurrentStats
            weight={latestRecord.weight}
            height={latestRecord.height}
          />
        )}

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Histórico de Crescimento</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        <GrowthHistory records={growthRecords} />
      </ScrollView>

      <AddGrowthModal
        visible={modalVisible}
        isSaving={isAddingGrowthRecord}
        onClose={() => setModalVisible(false)}
        onSave={handleAddRecord}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  emptyText: { fontSize: 16, color: Colors.textSecondary },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: Colors.text },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
