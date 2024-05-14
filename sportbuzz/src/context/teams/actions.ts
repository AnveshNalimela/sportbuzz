// src/context/projects/actions.ts
import { API_ENDPOINT } from "../../config/constants";

export const fetchTeams = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: "FETCH_TEAMS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    dispatch({ type: "FETCH_TEAMS_SUCCESS", payload: data });
  } catch (error) {
    console.log("Error fetching teams:", error);
    dispatch({
      type: "FETCH_TEAMS_FAILURE",
      payload: "Unable to load teams",
    });
  }
};
