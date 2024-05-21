// src/context/projects/context.tsx

import React, { createContext, useContext, useReducer } from "react";
import { ArticleActions, ArticleState, initialState, reducer } from "./reducer";
const ArticleStateContext = createContext<ArticleState | undefined>(undefined);

// Lets define a new type called ProjectsDispatch using TypeScript.

type ArticleDispatch = React.Dispatch<ArticleActions>;

const ArticleDispatchContext = createContext<ArticleDispatch | undefined>(
  undefined
);
export const ArticleProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Next, I'll pass the `dispatch` object as value of this ProjectsDispatchContext.

  return (
    <ArticleStateContext.Provider value={state}>
      <ArticleDispatchContext.Provider value={dispatch}>
        {children}
      </ArticleDispatchContext.Provider>
    </ArticleStateContext.Provider>
  );
};

export const useArticleState = () => useContext(ArticleStateContext);

export const useArticleDispatch = () => useContext(ArticleDispatchContext);
