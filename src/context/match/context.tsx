// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import { MatchActions, MatchState, initialState, reducer } from "./reducer";
const MatchStateContext = createContext<MatchState | undefined>(undefined);

// Lets define a new type called ProjectsDispatch using TypeScript.

type MatchDispatch = React.Dispatch<MatchActions>;

const MatchDispatchContext = createContext<MatchDispatch | undefined>(
  undefined
);
export const MatchProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <MatchStateContext.Provider value={state}>
      <MatchDispatchContext.Provider value={dispatch}>
        {children}
      </MatchDispatchContext.Provider>
    </MatchStateContext.Provider>
  );
};

export const useMatchState = () => useContext(MatchStateContext);

export const useMatchDispatch = () => useContext(MatchDispatchContext);
