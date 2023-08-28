import { createContext } from "react";
import { MasterReducer } from "./MasterReducer";
import { useImmerReducer } from "use-immer";

export const MasterContext = createContext(null);
export const MasterDispatchContext = createContext(null);

export function ContextsProvider({ children }) {
  const [MasterResume, dispatchMaster] = useImmerReducer(MasterReducer, { val: 0 });

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
