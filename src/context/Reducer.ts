import { PreferencesState } from "@/api/types";

export type PreferenceAction =
  | { type: "SET_TIME_FORMAT"; payload: "12-hour" | "24-hour" }
  | { type: "SET_UNIT"; payload: "standard" | "metric" | "imperial" };

export const preferenceReducer = (
  state: PreferencesState,
  action: PreferenceAction
): PreferencesState => {
  const nextState: PreferencesState = { ...state };

  switch (action.type) {
    case "SET_TIME_FORMAT":
      nextState.timeFormat = action.payload;
      break;

    case "SET_UNIT":
      nextState.unit = action.payload;
      break;

    default:
      return state;
  }

  try {
    window.localStorage.setItem("preferences", JSON.stringify(nextState));
  } catch (error) {
    console.error("Failed to save preferences to localStorage:", error);
  }

  return nextState;
};
