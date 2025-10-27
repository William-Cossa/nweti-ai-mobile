import ChartSection from "@/components/dashboard/ChartSection";
import EmptyState from "@/components/dashboard/EmptyState";
import Header from "@/components/dashboard/Header";
import StatsGrid from "@/components/dashboard/StatsGrid";
import SummaryCard from "@/components/dashboard/SummaryCard";
import VaccineProgress from "@/components/dashboard/VaccineProgress";
import Colors from "@/constants/colors";
import { useChild } from "@/contexts/ChildContext";
import { VACCINES } from "@/mocks/vaccines";
import { Stack } from "expo-router";
import { ScrollView, StyleSheet } from "react-native";

export default function DashboardScreen() {
  const {
    selectedChild,
    getChildGrowthRecords,
    getChildVaccinations,
    getChildPrescriptions,
  } = useChild();

  if (!selectedChild) {
    return <EmptyState message="Selecione uma criança para ver o painel" />;
  }

  const growthRecords = getChildGrowthRecords(selectedChild.id);
  const vaccinations = getChildVaccinations(selectedChild.id);
  const prescriptions = getChildPrescriptions(selectedChild.id);

  const completedVaccines = vaccinations.filter(
    (v: any) => v.status === "completed"
  ).length;
  const totalVaccines = VACCINES.length;
  const vaccineProgress =
    totalVaccines > 0 ? (completedVaccines / totalVaccines) * 100 : 0;

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
    return remainingMonths === 0
      ? `${years} ${years === 1 ? "ano" : "anos"}`
      : `${years}a ${remainingMonths}m`;
  };

  return (
    <>
      <Stack.Screen options={{ title: "Painel de Controlo" }} />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
      >
        <Header
          childName={selectedChild.name}
          childAge={getChildAge(selectedChild.dateOfBirth)}
        />

        <StatsGrid
          growthRecords={growthRecords}
          completedVaccines={completedVaccines}
          totalVaccines={totalVaccines}
          prescriptions={prescriptions}
          vaccineProgress={vaccineProgress}
        />

        {growthRecords.length >= 2 ? (
          <>
            <ChartSection
              title="Evolução do Peso (kg)"
              dataKey="weight"
              growthRecords={growthRecords}
              color={Colors.primary}
            />
            <ChartSection
              title="Evolução da Altura (cm)"
              dataKey="height"
              growthRecords={growthRecords}
              color={Colors.success}
            />
            <VaccineProgress
              progress={vaccineProgress}
              completed={completedVaccines}
              total={totalVaccines}
            />
            <SummaryCard records={growthRecords} />
          </>
        ) : (
          <EmptyState
            message="Dados Insuficientes"
            subMessage="Adicione pelo menos 2 medições de crescimento para visualizar os gráficos"
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 16, paddingBottom: 32 },
});
