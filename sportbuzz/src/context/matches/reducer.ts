interface Match {
  id: number;
  name: string;
  location: string;
  sportName: string;
  endsAt: string;
  isRunning: boolean;
  teams: { id: number; name: string }[];
}

// Define the initial state
export const initialState: MatchesState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export interface MatchesState {
  matches: Match[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MatchesActions =
  | { type: "FETCH_MATCHES_REQUEST" }
  | { type: "FETCH_MATCHES_SUCCESS"; payload: Match[] }
  | { type: "FETCH_MATCHES_FAILURE"; payload: string };

export const reducer = (
  state: MatchesState = initialState,
  action: MatchesActions
): MatchesState => {
  switch (action.type) {
    case "FETCH_MATCHES_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCHES_SUCCESS":
      return {
        ...state,
        isLoading: false,
        matches: action.payload,
      };
    case "FETCH_MATCHES_FAILURE":
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
