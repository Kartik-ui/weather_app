import { useContext } from "react";
import { PreferenceContext } from "./PreferenceContext";

export const usePreferences = () => {
  const context = useContext(PreferenceContext);
  if (!context)
    throw new Error("usePreferences must be used within a PreferenceProvider");
  return context;
};
