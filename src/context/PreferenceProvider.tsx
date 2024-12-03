import { PreferencesState } from "@/api/types";
import { ReactNode, useMemo, useReducer } from "react";
import { initialState, PreferenceContext } from "./PreferenceContext";
import { preferenceReducer } from "./Reducer";

const PreferenceProvider = ({ children }: { children: ReactNode }) => {
  const storedPreferences = useMemo(() => {
    const stored = window.localStorage.getItem("preferences");
    return stored ? (JSON.parse(stored) as PreferencesState) : null;
  }, []);

  const [state, dispatch] = useReducer(
    preferenceReducer,
    storedPreferences || initialState
  );

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
