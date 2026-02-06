export const getAuraStyle = (level, trustScore) => {
  const baseOpacity = trustScore < 0.5 ? "0.3" : "1.0";
  const glowEffect = trustScore < 0.8 ? "blur(4px)" : "drop-shadow(0 0 15px)";
  
  return {
    opacity: baseOpacity,
    filter: glowEffect,
    transition: "all 0.5s ease-in-out"
  };
};
