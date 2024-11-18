import { ReactNode, useReducer } from "react";
import { initialState, PreferenceContext } from "./PreferenceContext";
import { preferenceReducer } from "./Reducer";

const PreferenceProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(preferenceReducer, initialState);

  return (
    <PreferenceContext.Provider value={{ state, dispatch }}>
      {children}
    </PreferenceContext.Provider>
  );
};

export default PreferenceProvider;
