interface Match {
  id: number;
  isRunning: boolean;
  name: string;
  location: string;
  startsAt: string; // You may want to use Date type here
  endsAt: string; // You may want to use Date type here
  score: {
    [teamName: string]: string;
  };
  teams: {
    id: number;
    name: string;
  }[];
  sportName: string;
  playingTeam: number;
  story: string;
}

// Define the initial state
export const initialState: MatchState = {
  match: {
    id: 0,
    isRunning: false,
    name: "",
    location: "",
    startsAt: "",
    endsAt: "",
    score: {},
    teams: [],
    sportName: "",
    playingTeam: 0,
    story: "",
  },
  isLoading: false,
  isError: false,
  errorMessage: "",
};
export interface MatchState {
  match: Match;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type MatchActions =
  | { type: "FETCH_MATCH_REQUEST" }
  | { type: "FETCH_MATCH_SUCCESS"; payload: Match }
  | { type: "FETCH_MATCH_FAILURE"; payload: string };

export const reducer = (
  state: MatchState = initialState,
  action: MatchActions
): MatchState => {
  switch (action.type) {
    case "FETCH_MATCH_REQUEST":
      return {
        ...state,
        isLoading: true,
      };
    case "FETCH_MATCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        match: action.payload,
      };
    case "FETCH_MATCH_FAILURE":
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
