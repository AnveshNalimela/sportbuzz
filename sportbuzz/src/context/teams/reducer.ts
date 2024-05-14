// Define types for your data
interface Team {
  id: number;
  name: string;
  plays: string;
}

// Define the initial state
// Define the initial state
export const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export interface TeamsState {
  teams: Team[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type TeamsActions =
  | { type: "FETCH_TEAMS_REQUEST" }
  | { type: "FETCH_TEAMS_SUCCESS"; payload: Team[] }
  | { type: "FETCH_TEAMS_FAILURE"; payload: string };

export const reducer = (
  state: TeamsState = initialState,
  action: TeamsActions
): TeamsState => {
  switch (action.type) {
    case "FETCH_TEAMS_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_TEAMS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        teams: action.payload,
      };
    case "FETCH_TEAMS_FAILURE":
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
