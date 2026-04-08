export default {
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": { transform: "translateY(0px)", opacity: "0.8" },
          "50%": { transform: "translateY(-20px)", opacity: "1" },
          "100%": { transform: "translateY(0px)", opacity: "0.8" },
        },
        popMessage: {
          "0%": { transform: "scale(0.5)", opacity: "0" },
          "50%": { transform: "scale(1.1)", opacity: "1" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        float: "float linear infinite",
        popMessage: "popMessage 3s ease-in-out forwards",
      },
    },
  },
};