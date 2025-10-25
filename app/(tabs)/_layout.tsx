import Colors from "@/constants/colors";
import { Tabs } from "expo-router";
import { Home, MessageCircle, Syringe, User } from "lucide-react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.borderLight,
          borderTopWidth: 1,
          paddingTop: 8,
          paddingBottom: 8 + insets.bottom, // 👈 respeita o safe area
          height: 60 + insets.bottom, // 👈 ajusta a altura total
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600" as const,
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          title: "Início",
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="vaccinations"
        options={{
          title: "Vacinas",
          tabBarIcon: ({ color, size }) => (
            <Syringe size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Assistente",
          tabBarIcon: ({ color, size }) => (
            <MessageCircle size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
          title: "Perfil",
        }}
      />
    </Tabs>
  );
}
