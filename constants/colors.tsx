// Colors.ts - Baseado no logo da aplicação
const Colors = {
  light: "#4A7C8C",
  dark: "#3A6575",

  primary: "#4A7C8C",
  primaryDark: "#3A6575",
  primaryLight: "#E3F0F3",

  success: "#6DBDB6",
  successLight: "#E0F5F3",

  warning: "#F5B97A",
  warningLight: "#FFF3E0",

  danger: "#E07A7A",
  dangerLight: "#FDE8E8",

  info: "#4A7C8C",
  infoLight: "#E3F0F3",

  background: "#F9F9F9",
  surface: "#FFFFFF",

  text: "#5D4037",
  textSecondary: "#6D7A7A",
  textLight: "#A5B3B3",

  border: "#E8E8E8",
  borderLight: "#F0F0F0",

  shadow: "rgba(93, 64, 55, 0.1)",
  shadowDark: "rgba(93, 64, 55, 0.2)",

  gradient: {
    primary: ["#4A7C8C", "#3A6575"] as const,
    success: ["#6DBDB6", "#5DB39F"] as const,
    warm: ["#F5B97A", "#E07A7A"] as const,
  },
};

export default Colors;
