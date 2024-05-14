// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import { TeamsActions, TeamsState, initialState, reducer } from "./reducer";

const TeamsStateContext = createContext<TeamsState | undefined>(undefined);

type TeamsDispatch = React.Dispatch<TeamsActions>;

const TeamsDispatchContext = createContext<TeamsDispatch | undefined>(
  undefined
);

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

export const useTeamsState = () => useContext(TeamsStateContext);

export const useTeamsDispatch = () => useContext(TeamsDispatchContext);
