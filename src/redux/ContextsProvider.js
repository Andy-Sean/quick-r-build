"use client"
// Context Export for Every Page in App

import { useImmerReducer } from "use-immer";
import { createContext } from "react";

import { MasterReducer, initialMaster } from "./MasterReducer";

export const MasterContext = createContext(null);
export const MasterDispatchContext = createContext(null);

export function ContextsProvider({ children }) {
  const [MasterResume, dispatchMaster] = useImmerReducer(MasterReducer, initialMaster);

  return (
    <>
    <MasterContext.Provider value={MasterResume}>
      <MasterDispatchContext.Provider value={dispatchMaster}>
        {children}
      </MasterDispatchContext.Provider>
    </MasterContext.Provider>
    </>
  )
}
