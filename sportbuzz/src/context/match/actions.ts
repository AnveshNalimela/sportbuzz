// src/context/projects/actions.ts
import { API_ENDPOINT } from "../../config/constants";
export const fetchMatchById = async (dispatch: any, matchId: number) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_MATCH_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/matches/${matchId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(matchId)
    const data = await response.json();
    console.log(data);
    dispatch({ type: "FETCH_MATCH_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching match details:", error);
    dispatch({
      type: "FETCH_MATCH_FAILURE",
      payload: "Unable to load  match deatils",
    });
  }
};
