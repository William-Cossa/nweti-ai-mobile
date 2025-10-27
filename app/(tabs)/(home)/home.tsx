import ChildHeader from "@/components/home/ChildHeader";
import EmptyState from "@/components/home/EmptyState";
import PromptCard from "@/components/home/PromptCard";
import QuickActions from "@/components/home/QuickActions";
import StatsCard from "@/components/home/StatsCard";
import TipsCarousel from "@/components/home/TipsCarousel";
import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { useRouter } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const router = useRouter();
  const { selectedChild } = useChild();

  if (!selectedChild) {
    return <EmptyState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <TipsCarousel />
        <ChildHeader />
        <StatsCard />
        <QuickActions />
        <PromptCard />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16 },
});
