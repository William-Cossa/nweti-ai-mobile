import AsyncStorage from "@react-native-async-storage/async-storage";

export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log("🧹 Todos os dados foram removidos do AsyncStorage!");
  } catch (error) {
    console.error("❌ Erro ao limpar AsyncStorage:", error);
  }
};
