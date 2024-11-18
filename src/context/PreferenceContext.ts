import type { PreferencesState } from "@/api/types";
import { createContext } from "react";
import { PreferenceAction } from "./Reducer";

export const initialState: PreferencesState = {
  timeFormat: "12-hour",
  unit: "metric",
};

export const PreferenceContext = createContext<{
  state: PreferencesState;
  dispatch: React.Dispatch<PreferenceAction>;
} | null>({
  state: initialState,
  dispatch: () => undefined,
});
