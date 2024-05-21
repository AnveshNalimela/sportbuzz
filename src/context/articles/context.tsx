// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import {
  ArticlesActions,
  ArticlesState,
  initialState,
  reducer,
} from "./reducer";
const ArticlesStateContext = createContext<ArticlesState | undefined>(
  undefined
);

// Lets define a new type called ProjectsDispatch using TypeScript.

type ArticlesDispatch = React.Dispatch<ArticlesActions>;

const ArticlesDispatchContext = createContext<ArticlesDispatch | undefined>(
  undefined
);
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

export const useArticlesState = () => useContext(ArticlesStateContext);

export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);
