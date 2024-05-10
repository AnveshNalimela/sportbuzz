interface Article {
  id: number;
  title: string;
  thumbnail: string;
  sport: {
    id: number;
    name: string;
  };
  date: string;
  content: string;
  summary: string;
  teams: {
    id: number;
    name: string;
  }[];
}

// Define the initial state
export const initialState: ArticleState = {
  article: {
    id: 0,
    title: "",
    thumbnail: "",
    sport: {
      id: 0,
      name: "",
    },
    date: "",
    content: "",
    summary: "",
    teams: [],
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export interface ArticleState {
  article: Article;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type ArticleActions =
  | { type: "FETCH_ARTICLE_REQUEST" }
  | { type: "FETCH_ARTICLE_SUCCESS"; payload: Article }
  | { type: "FETCH_ARTICLE_FAILURE"; payload: string };

export const reducer = (
  state: ArticleState = initialState,
  action: ArticleActions
): ArticleState => {
  switch (action.type) {
    case "FETCH_ARTICLE_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_ARTICLE_SUCCESS":
      return {
        ...state,
        isLoading: false,
        article: action.payload,
      };
    case "FETCH_ARTICLE_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    default:
      return state;
  }
};
