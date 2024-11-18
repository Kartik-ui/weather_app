import { PreferencesState } from "@/api/types";

export type PreferenceAction =
  | { type: "SET_TIME_FORMAT"; payload: "12-hour" | "24-hour" }
  | {
      type: "SET_UNIT";
      payload: "standard" | "metric" | "imperial";
    };

export const preferenceReducer = (
  state: PreferencesState,
  action: PreferenceAction
): PreferencesState => {
  switch (action.type) {
    case "SET_TIME_FORMAT":
      return { ...state, timeFormat: action.payload };

    case "SET_UNIT":
      return { ...state, unit: action.payload };

    default:
      return state;
  }
};
