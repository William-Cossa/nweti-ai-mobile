import Colors from "@/constants/colors";
import { Stack } from "expo-router";

export default function VaccinationsLayout() {
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
        name="index"
        options={{
          title: "Vacinação",
        }}
      />
    </Stack>
  );
}
