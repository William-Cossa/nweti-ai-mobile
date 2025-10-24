export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: "pregnancy" | "infant" | "nutrition" | "development" | "safety";
  imageUrl: string;
}

export const HEALTH_TIPS: HealthTip[] = [
  {
    id: "tip-1",
    title: "Amamentação Exclusiva",
    description:
      "Nos primeiros 6 meses, o leite materno é o alimento completo para o bebé. Fornece todos os nutrientes necessários e fortalece o sistema imunológico.",
    category: "infant",
    imageUrl: "https://illustrations.popsy.co/amber/mother-and-baby.svg",
  },
  {
    id: "tip-2",
    title: "Vacinação em Dia",
    description:
      "Mantenha o calendário de vacinação actualizado para proteger o seu filho contra doenças graves. As vacinas são seguras e essenciais.",
    category: "infant",
    imageUrl: "https://illustrations.popsy.co/amber/vaccine.svg",
  },
  {
    id: "tip-3",
    title: "Alimentação Saudável",
    description:
      "Introduza alimentos variados e nutritivos após os 6 meses de idade. Ofereça frutas, vegetais, cereais e proteínas de forma gradual.",
    category: "nutrition",
    imageUrl: "https://illustrations.popsy.co/amber/healthy-food.svg",
  },
  {
    id: "tip-4",
    title: "Desenvolvimento Motor",
    description:
      "Estimule o bebé com brincadeiras adequadas à sua idade. O tempo de barriga fortalece os músculos e prepara para engatinhar.",
    category: "development",
    imageUrl: "https://illustrations.popsy.co/amber/baby-playing.svg",
  },
  {
    id: "tip-5",
    title: "Higiene e Cuidados",
    description:
      "Lave sempre as mãos antes de cuidar do bebé e mantenha o ambiente limpo. A higiene previne infecções e doenças.",
    category: "safety",
    imageUrl: "https://illustrations.popsy.co/amber/washing-hands.svg",
  },
  {
    id: "tip-6",
    title: "Sono Seguro",
    description:
      "Coloque o bebé de costas para dormir e evite objectos soltos no berço. Um ambiente seguro reduz o risco de sufocamento.",
    category: "safety",
    imageUrl: "https://illustrations.popsy.co/amber/baby-sleeping.svg",
  },
  {
    id: "tip-7",
    title: "Hidratação",
    description:
      "Após os 6 meses, ofereça água ao bebé durante as refeições. A hidratação é importante para o bom funcionamento do organismo.",
    category: "nutrition",
    imageUrl: "https://illustrations.popsy.co/amber/drinking-water.svg",
  },
  {
    id: "tip-8",
    title: "Consultas Regulares",
    description:
      "Leve o bebé às consultas de rotina para acompanhar o crescimento. O pediatra avalia o desenvolvimento e orienta sobre cuidados.",
    category: "infant",
    imageUrl: "https://illustrations.popsy.co/amber/doctor-consultation.svg",
  },
  {
    id: "tip-9",
    title: "Cuidados na Gravidez",
    description:
      "Durante a gravidez, mantenha uma alimentação equilibrada e faça o pré-natal regularmente. Cuide da sua saúde para o bem-estar do bebé.",
    category: "pregnancy",
    imageUrl: "https://illustrations.popsy.co/amber/pregnant-woman.svg",
  },
  {
    id: "tip-10",
    title: "Exercícios na Gravidez",
    description:
      "Pratique exercícios leves e adequados durante a gravidez. Caminhadas e yoga ajudam na preparação para o parto.",
    category: "pregnancy",
    imageUrl: "https://illustrations.popsy.co/amber/yoga-pregnancy.svg",
  },
  {
    id: "tip-11",
    title: "Primeiros Socorros",
    description:
      "Conheça técnicas básicas de primeiros socorros para bebés. Saiba como agir em caso de engasgamento ou febre alta.",
    category: "safety",
    imageUrl: "https://illustrations.popsy.co/amber/first-aid.svg",
  },
  {
    id: "tip-12",
    title: "Desenvolvimento da Fala",
    description:
      "Converse com o bebé desde cedo e leia histórias. A estimulação verbal é fundamental para o desenvolvimento da linguagem.",
    category: "development",
    imageUrl: "https://illustrations.popsy.co/amber/reading-book.svg",
  },
  {
    id: "tip-13",
    title: "Introdução Alimentar",
    description:
      "Comece a introdução alimentar aos 6 meses com alimentos amassados. Respeite o ritmo do bebé e ofereça variedade.",
    category: "nutrition",
    imageUrl: "https://illustrations.popsy.co/amber/baby-food.svg",
  },
  {
    id: "tip-14",
    title: "Saúde Mental Materna",
    description:
      "Cuide da sua saúde mental no pós-parto. Peça ajuda quando necessário e não hesite em falar sobre seus sentimentos.",
    category: "pregnancy",
    imageUrl: "https://illustrations.popsy.co/amber/mental-health.svg",
  },
  {
    id: "tip-15",
    title: "Rotina de Sono",
    description:
      "Estabeleça uma rotina de sono consistente. Banho morno e ambiente tranquilo ajudam o bebé a dormir melhor.",
    category: "infant",
    imageUrl: "https://illustrations.popsy.co/amber/bedtime-routine.svg",
  },
  {
    id: "tip-16",
    title: "Segurança em Casa",
    description:
      "Adapte a casa para a segurança do bebé. Proteja tomadas, cantos de móveis e mantenha produtos perigosos fora do alcance.",
    category: "safety",
    imageUrl: "https://illustrations.popsy.co/amber/home-safety.svg",
  },
  {
    id: "tip-17",
    title: "Estimulação Sensorial",
    description:
      "Ofereça brinquedos com diferentes texturas, cores e sons. A estimulação sensorial é importante para o desenvolvimento cerebral.",
    category: "development",
    imageUrl: "https://illustrations.popsy.co/amber/sensory-play.svg",
  },
  {
    id: "tip-18",
    title: "Alergias Alimentares",
    description:
      "Introduza novos alimentos um de cada vez e observe reacções. Consulte o pediatra se suspeitar de alergias.",
    category: "nutrition",
    imageUrl: "https://illustrations.popsy.co/amber/food-allergy.svg",
  },
];
