import { beforeEach, describe, expect, it, vi } from "vitest";
import { API_ENDPOINT } from "../config/constants";
import { fetchArticleById } from "../context/article/actions";
import { fetchMatchById } from "../context/match/actions";
import { fetchMatches } from "../context/matches/actions";
import { fetchSports } from "../context/sports/actions";
import { fetchTeams } from "../context/teams/actions";

// Mock the global fetch function
global.fetch = vi.fn();

describe("fetchMatches function unit test suite", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  it("should dispatch FETCH_MATCHES_REQUEST and FETCH_MATCHES_SUCCESS on successful fetch", async () => {
    const mockData = { matches: ["match1", "match2"] };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
    });

    await fetchMatches(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_MATCHES_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_MATCHES_SUCCESS",
      payload: mockData.matches,
    });
  });

  it("should dispatch FETCH_MATCHES_REQUEST and FETCH_MATCHES_FAILURE on fetch failure", async () => {
    (fetch as any).mockRejectedValueOnce({});

    await fetchMatches(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_MATCHES_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_MATCHES_FAILURE",
      payload: "Unable to load  matches",
    });
  });
});

describe("fetchMatchById unit tests", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  it("should dispatch FETCH_MATCH_REQUEST and FETCH_MATCH_SUCCESS on successful fetch", async () => {
    const mockMatchId = 1;
    const mockData = { id: mockMatchId, name: "Match 1" };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
    });

    await fetchMatchById(dispatch, mockMatchId);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_MATCH_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_MATCH_SUCCESS",
      payload: mockData,
    });
  });

  it("should dispatch FETCH_MATCH_REQUEST and FETCH_MATCH_FAILURE on fetch failure", async () => {
    const mockMatchId = 1;

    (fetch as any).mockRejectedValueOnce({});

    await fetchMatchById(dispatch, mockMatchId);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_MATCH_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_MATCH_FAILURE",
      payload: "Unable to load  match deatils",
    });
  });
});

describe("fetchArticleById unit test suite", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  it("should dispatch FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_SUCCESS on successful fetch", async () => {
    const mockArticleId = 1;
    const mockData = { id: mockArticleId, title: "Article 1" };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
    });

    await fetchArticleById(dispatch, mockArticleId);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_ARTICLE_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_ARTICLE_SUCCESS",
      payload: mockData,
    });
  });

  it("should dispatch FETCH_ARTICLE_REQUEST and FETCH_ARTICLE_FAILURE on fetch failure", async () => {
    const mockArticleId = 1;

    (fetch as any).mockRejectedValueOnce({});

    await fetchArticleById(dispatch, mockArticleId);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_ARTICLE_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_ARTICLE_FAILURE",
      payload: "Unable to load  articles with id",
    });
  });
});

describe("fetchTeams unit test suite", () => {
  const dispatch = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks(); // Clear any previous mock calls
  });

  it("should dispatch FETCH_TEAMS_REQUEST and FETCH_TEAMS_SUCCESS on successful fetch", async () => {
    const mockData = { teams: [{ id: 1, name: "Team A" }] };

    (fetch as any).mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
    });

    await fetchTeams(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_TEAMS_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_TEAMS_SUCCESS",
      payload: mockData,
    });
  });

  it("should dispatch FETCH_TEAMS_REQUEST and FETCH_TEAMS_FAILURE on fetch failure", async () => {
    (fetch as any).mockRejectedValueOnce({});

    await fetchTeams(dispatch);

    expect(dispatch).toHaveBeenCalledWith({ type: "FETCH_TEAMS_REQUEST" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "FETCH_TEAMS_FAILURE",
      payload: "Unable to load teams",
    });
  });
});

describe("fetchSports action creator unit test suite", () => {
  const mockDispatch = vi.fn();
  const mockFetch = vi.spyOn(global, "fetch");

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("dispatches FETCH_SPORTS_REQUEST and FETCH_SPORTS_SUCCESS on successful fetch", async () => {
    const mockSports = [
      { id: 1, name: "Football" },
      { id: 2, name: "Basketball" },
    ];

    // Define a mock Response object
    const mockResponse = {
      json: vi.fn().mockResolvedValueOnce({ sports: mockSports }),
      // Add other required properties if needed
      ok: true,
      status: 200,
      statusText: "OK",
      headers: new Headers(),
      url: `${API_ENDPOINT}/sports`,
    } as unknown as Response; // Cast to unknown first

    mockFetch.mockResolvedValueOnce(mockResponse);

    await fetchSports(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "FETCH_SPORTS_REQUEST" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "FETCH_SPORTS_SUCCESS",
      payload: mockSports,
    });
  });

  it("dispatches FETCH_SPORTS_REQUEST and FETCH_SPORTS_FAILURE on failed fetch", async () => {
    mockFetch.mockRejectedValueOnce({});

    await fetchSports(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith({ type: "FETCH_SPORTS_REQUEST" });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: "FETCH_SPORTS_FAILURE",
      payload: "Unable to load  sports",
    });
  });
});
