"use client";

import React, { createContext, useContext, useReducer } from "react";
import { Action, AppState, GlobalProviderProps } from "@/context/domain";
import { reducer } from "@/context/reducer";

const initialState: AppState = {};
const GlobalContext = createContext<any>(initialState);

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): {
  state: AppState;
  dispatch: React.Dispatch<Action>;
} => useContext(GlobalContext);
