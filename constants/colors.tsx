const Colors = {
  primary: "#4A90E2",
  primaryDark: "#357ABD",
  primaryLight: "#E3F2FD",

  success: "#5CB85C",
  successLight: "#D4EDDA",

  warning: "#F0AD4E",
  warningLight: "#FFF3CD",

  danger: "#D9534F",
  dangerLight: "#F8D7DA",

  info: "#5BC0DE",
  infoLight: "#D1ECF1",

  background: "#F8F9FA",
  surface: "#FFFFFF",

  text: "#212529",
  textSecondary: "#6C757D",
  textLight: "#ADB5BD",

  border: "#DEE2E6",
  borderLight: "#E9ECEF",

  shadow: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.2)",

  gradient: {
    primary: ["#4A90E2", "#357ABD"] as const,
    success: ["#5CB85C", "#4A9D4A"] as const,
    warm: ["#FF9A8B", "#FF6A88"] as const,
  },
};

export default Colors;
