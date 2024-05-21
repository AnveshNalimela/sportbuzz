// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import { MatchesActions, MatchesState, initialState, reducer } from "./reducer";
const MatchesStateContext = createContext<MatchesState | undefined>(undefined);

// Lets define a new type called ProjectsDispatch using TypeScript.

type MatchesDispatch = React.Dispatch<MatchesActions>;

const MatchesDispatchContext = createContext<MatchesDispatch | undefined>(
  undefined
);
export const MatchesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <MatchesStateContext.Provider value={state}>
      <MatchesDispatchContext.Provider value={dispatch}>
        {children}
      </MatchesDispatchContext.Provider>
    </MatchesStateContext.Provider>
  );
};

export const useMatchesState = () => useContext(MatchesStateContext);

export const useMatchesDispatch = () => useContext(MatchesDispatchContext);
