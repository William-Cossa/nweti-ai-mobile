import axios from "axios";

export const testConnection = async () => {
  try {
    const response = await axios.get(
      `${process.env.EXPO_PUBLIC_API_URL}/teste`
    );
    console.log("✅ Conexão bem-sucedida:", response.data);
  } catch (error) {
    console.error("❌ Erro de conexão:", error);
  }
};
