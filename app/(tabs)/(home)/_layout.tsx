import Colors from "@/constants/colors";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: "700" as const,
        },
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          title: "Saúde Materno-Infantil",
        }}
      />
      <Stack.Screen
        name="growth"
        options={{
          title: "Crescimento",
        }}
      />
      <Stack.Screen
        name="prescriptions"
        options={{
          title: "Prescrições",
        }}
      />
      <Stack.Screen
        name="recommendations"
        options={{
          title: "Recomendações",
        }}
      />
      <Stack.Screen
        name="reminders"
        options={{
          title: "Lembretes",
        }}
      />
      <Stack.Screen
        name="dashboard"
        options={{
          title: "Painel de Estatísticas",
        }}
      />
      <Stack.Screen
        name="health-tips"
        options={{
          title: "Dicas de Saúde",
        }}
      />
    </Stack>
  );
}
