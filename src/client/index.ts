import * as z from "zod";

import * as schemas from "~/schemas";

import { Requestor } from "./requestor";

export const BASE_URL = "https://lichess.org";
type BASE_URL = typeof BASE_URL;

export class Lichess {
  private readonly requestor: Requestor<BASE_URL>;

  constructor(options: { token: string | null }) {
    const { token } = options;
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  /**
   * Get real-time users status
   */
  async apiUsersStatus(params: {
    ids: string;
    withSignal?: boolean;
    withGameIds?: boolean;
    withGameMetas?: boolean;
  }) {
    const path = "/api/users/status" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.array(
          z.object({
            id: z.string(),
            name: z.string(),
            flair: schemas.Flair.optional(),
            title: schemas.Title.optional(),
            online: z.boolean().optional(),
            playing: z.boolean().optional(),
            streaming: z.boolean().optional(),
            patron: schemas.Patron.optional(),
            patronColor: schemas.PatronColor.optional(),
          })
        );
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get all top 10
   */
  async player() {
    const path = "/api/player" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Top10s;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get one leaderboard
   */
  async playerTopNbPerfType(params: { nb: number; perfType: string }) {
    const path = `/api/player/top/${params.nb}/${params.perfType}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Leaderboard;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get user public data
   */
  async apiUser(params: { username: string } & { trophies?: boolean }) {
    const path = `/api/user/${params.username}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.UserExtended;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get rating history of a user
   */
  async apiUserRatingHistory(params: { username: string }) {
    const path = `/api/user/${params.username}/rating-history` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.RatingHistory;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get performance statistics of a user
   */
  async apiUserPerf(params: { username: string; perf: schemas.PerfType }) {
    const path = `/api/user/${params.username}/perf/${params.perf}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PerfStat;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get user activity
   */
  async apiUserActivity(params: { username: string }) {
    const path = `/api/user/${params.username}/activity` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.UserActivity);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get the daily puzzle
   */
  async apiPuzzleDaily() {
    const path = "/api/puzzle/daily" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a puzzle by its ID
   */
  async apiPuzzleId(params: { id: string }) {
    const path = `/api/puzzle/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a new puzzle
   */
  async apiPuzzleNext(params: {
    angle?: string;
    difficulty?: string;
    color?: string;
  }) {
    const path = "/api/puzzle/next" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get multiple puzzles at once
   */
  async apiPuzzleBatchSelect(
    params: { angle: string } & {
      difficulty?: string;
      nb?: number;
      color?: string;
    }
  ) {
    const path = `/api/puzzle/batch/${params.angle}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleBatchSelect;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Solve multiple puzzles at once
   */
  async apiPuzzleBatchSolve(
    params: { angle: string } & { nb?: number } & {
      body: schemas.PuzzleBatchSolveRequest;
    }
  ) {
    const path = `/api/puzzle/batch/${params.angle}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({
      path,
      query,
      body,
    });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleBatchSolveResponse;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get your puzzle activity
   */
  async apiPuzzleActivity(params: { max?: number; before?: number }) {
    const path = "/api/puzzle/activity" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get puzzles to replay
   */
  async apiPuzzleReplay(params: { days: number; theme: string }) {
    const path = `/api/puzzle/replay/${params.days}/${params.theme}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleReplay;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = z.object({ error: z.string().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get your puzzle dashboard
   */
  async apiPuzzleDashboard(params: { days: number }) {
    const path = `/api/puzzle/dashboard/${params.days}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleDashboard;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get the storm dashboard of a player
   */
  async apiStormDashboard(params: { username: string } & { days?: number }) {
    const path = `/api/storm/dashboard/${params.username}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleStormDashboard;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create and join a puzzle race
   */
  async racerPost() {
    const path = "/api/racer" as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleRacer;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get puzzle race results
   */
  async racerGet(params: { id: string }) {
    const path = `/api/racer/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleRaceResults;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get users by ID
   */
  async apiUsers(params: { body: string }) {
    const path = "/api/users" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.User);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my profile
   */
  async accountMe() {
    const path = "/api/account" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.UserExtended;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my email address
   */
  async accountEmail() {
    const path = "/api/account/email" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ email: z.string().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my preferences
   */
  async account() {
    const path = "/api/account/preferences" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          prefs: schemas.UserPreferences.optional(),
          language: z.string().optional(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my kid mode status
   */
  async accountKid() {
    const path = "/api/account/kid" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ kid: z.boolean().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Set my kid mode status
   */
  async accountKidPost(params: { v: boolean }) {
    const path = "/api/account/kid" as const;
    const query = params;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my timeline
   */
  async timeline(params: { since?: number; nb?: number }) {
    const path = "/api/timeline" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Timeline;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export one game
   */
  async gamePgn(
    params: { gameId: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
      withBookmarked?: boolean;
    }
  ) {
    const path = `/game/export/${params.gameId}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export ongoing game of a user
   */
  async apiUserCurrentGame(
    params: { username: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    }
  ) {
    const path = `/api/user/${params.username}/current-game` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export games of a user
   */
  async apiGamesUser(
    params: { username: string } & {
      since?: number;
      until?: number;
      max?: number;
      vs?: string;
      rated?: boolean;
      perfType?: schemas.PerfType | null;
      color?: string;
      analysed?: boolean;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      ongoing?: boolean;
      finished?: boolean;
      literate?: boolean;
      lastFen?: boolean;
      withBookmarked?: boolean;
      sort?: string;
    }
  ) {
    const path = `/api/games/user/${params.username}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export games by IDs
   */
  async gamesExportIds(
    params: {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    } & { body: string }
  ) {
    const path = "/api/games/export/_ids" as const;
    const query = {
      /* ~query~ */
    } as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({
      path,
      query,
      body,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream games of users
   */
  async gamesByUsers(
    params: { withCurrentGames?: boolean } & { body: string }
  ) {
    const path = "/api/stream/games-by-users" as const;
    const query = {
      /* ~query~ */
    } as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({
      path,
      query,
      body,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream games by IDs
   */
  async gamesByIds(params: { streamId: string } & { body: string }) {
    const path = `/api/stream/games/${params.streamId}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Add game IDs to stream
   */
  async gamesByIdsAdd(params: { streamId: string } & { body: string }) {
    const path = `/api/stream/games/${params.streamId}/add` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get my ongoing games
   */
  async apiAccountPlaying(params: { nb?: number }) {
    const path = "/api/account/playing" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.object({
          nowPlaying: z.array(
            z.object({
              fullId: z.string(),
              gameId: z.string(),
              fen: z.string(),
              color: schemas.GameColor,
              lastMove: z.string(),
              source: schemas.GameSource,
              status: schemas.GameStatusName.optional(),
              variant: schemas.Variant,
              speed: schemas.Speed,
              perf: schemas.PerfType,
              rated: z.boolean(),
              hasMoved: z.boolean(),
              opponent: z.object({
                id: z.string(),
                username: z.string(),
                rating: z.int().optional(),
                ratingDiff: z.int().optional(),
                ai: z.int().optional(),
              }),
              isMyTurn: z.boolean(),
              secondsLeft: z.int(),
              tournamentId: z.string().optional(),
              swissId: z.string().optional(),
              winner: schemas.GameColor.optional(),
              ratingDiff: z.int().optional(),
            })
          ),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream moves of a game
   */
  async streamGame(params: { id: string }) {
    const path = `/api/stream/game/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      case 429: {
        const schema = z.object({ error: z.string().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Import one game
   */
  async gameImport(params: { body: { pgn?: string } }) {
    const path = "/api/import" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.object({
          id: z.string().optional(),
          url: z.url().optional(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export your imported games
   */
  async apiImportedGamesUser() {
    const path = "/api/games/export/imports" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export your bookmarked games
   */
  async apiExportBookmarks(params: {
    since?: number;
    until?: number;
    max?: number;
    moves?: boolean;
    pgnInJson?: boolean;
    tags?: boolean;
    clocks?: boolean;
    evals?: boolean;
    accuracy?: boolean;
    opening?: boolean;
    division?: boolean;
    literate?: boolean;
    lastFen?: boolean;
    sort?: string;
  }) {
    const path = "/api/games/export/bookmarks" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get current TV games
   */
  async tvChannels() {
    const path = "/api/tv/channels" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          bot: schemas.TvGame,
          blitz: schemas.TvGame,
          racingKings: schemas.TvGame,
          ultraBullet: schemas.TvGame,
          bullet: schemas.TvGame,
          classical: schemas.TvGame,
          threeCheck: schemas.TvGame,
          antichess: schemas.TvGame,
          computer: schemas.TvGame,
          horde: schemas.TvGame,
          rapid: schemas.TvGame,
          atomic: schemas.TvGame,
          crazyhouse: schemas.TvGame,
          chess960: schemas.TvGame,
          kingOfTheHill: schemas.TvGame,
          best: schemas.TvGame,
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream current TV game
   */
  async tvFeed() {
    const path = "/api/tv/feed" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream current TV game of a TV channel
   */
  async tvChannelFeed(params: { channel: string }) {
    const path = `/api/tv/${params.channel}/feed` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get best ongoing games of a TV channel
   */
  async tvChannelGames(
    params: { channel: string } & {
      nb?: number;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      opening?: boolean;
    }
  ) {
    const path = `/api/tv/${params.channel}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get current tournaments
   */
  async apiTournament() {
    const path = "/api/tournament" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournaments;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a new Arena tournament
   */
  async apiTournamentPost(params: {
    body: {
      name?: string;
      clockTime:
        | 0
        | 0.25
        | 0.5
        | 0.75
        | 1
        | 1.5
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      clockIncrement:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      minutes:
        | 20
        | 25
        | 30
        | 35
        | 40
        | 45
        | 50
        | 55
        | 60
        | 70
        | 80
        | 90
        | 100
        | 110
        | 120
        | 150
        | 180
        | 210
        | 240
        | 270
        | 300
        | 330
        | 360
        | 420
        | 480
        | 540
        | 600
        | 720;
      waitMinutes?: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 45 | 60;
      startDate?: number;
      variant?: schemas.VariantKey;
      rated?: boolean;
      position?: schemas.FromPositionFEN;
      berserkable?: boolean;
      streakable?: boolean;
      hasChat?: boolean;
      description?: string;
      password?: string;
      teamBattleByTeam?: string;
      "conditions.teamMember.teamId"?: string;
      "conditions.minRating.rating"?:
        | 1000
        | 1100
        | 1200
        | 1300
        | 1400
        | 1500
        | 1600
        | 1700
        | 1800
        | 1900
        | 2000
        | 2100
        | 2200
        | 2300
        | 2400
        | 2500
        | 2600;
      "conditions.maxRating.rating"?:
        | 2200
        | 2100
        | 2000
        | 1900
        | 1800
        | 1700
        | 1600
        | 1500
        | 1400
        | 1300
        | 1200
        | 1100
        | 1000
        | 900
        | 800;
      "conditions.nbRatedGame.nb"?:
        | 0
        | 5
        | 10
        | 15
        | 20
        | 30
        | 40
        | 50
        | 75
        | 100
        | 150
        | 200;
      "conditions.allowList"?: string;
      "conditions.bots"?: boolean;
      "conditions.accountAge"?:
        | 1
        | 3
        | 7
        | 14
        | 30
        | 60
        | 90
        | 180
        | 365
        | 730
        | 1095;
    };
  }) {
    const path = "/api/tournament" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournamentFull;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Shared path params for methods below --- */

  /**
   * Get info about an Arena tournament
   */
  async tournament(params: { id: string } & { page?: number }) {
    const path = `/api/tournament/${params.id}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournamentFull;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update an Arena tournament
   */
  async apiTournamentUpdate(params: {
    body: {
      name?: string;
      clockTime:
        | 0
        | 0.25
        | 0.5
        | 0.75
        | 1
        | 1.5
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 8
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      clockIncrement:
        | 0
        | 1
        | 2
        | 3
        | 4
        | 5
        | 6
        | 7
        | 10
        | 15
        | 20
        | 25
        | 30
        | 40
        | 50
        | 60;
      minutes:
        | 20
        | 25
        | 30
        | 35
        | 40
        | 45
        | 50
        | 55
        | 60
        | 70
        | 80
        | 90
        | 100
        | 110
        | 120
        | 150
        | 180
        | 210
        | 240
        | 270
        | 300
        | 330
        | 360
        | 420
        | 480
        | 540
        | 600
        | 720;
      waitMinutes?: 1 | 2 | 3 | 5 | 10 | 15 | 20 | 30 | 45 | 60;
      startDate?: number;
      variant?: schemas.VariantKey;
      rated?: boolean;
      position?: schemas.FromPositionFEN;
      berserkable?: boolean;
      streakable?: boolean;
      hasChat?: boolean;
      description?: string;
      password?: string;
      "conditions.minRating.rating"?:
        | 1000
        | 1100
        | 1200
        | 1300
        | 1400
        | 1500
        | 1600
        | 1700
        | 1800
        | 1900
        | 2000
        | 2100
        | 2200
        | 2300
        | 2400
        | 2500
        | 2600;
      "conditions.maxRating.rating"?:
        | 2200
        | 2100
        | 2000
        | 1900
        | 1800
        | 1700
        | 1600
        | 1500
        | 1400
        | 1300
        | 1200
        | 1100
        | 1000
        | 900
        | 800;
      "conditions.nbRatedGame.nb"?:
        | 0
        | 5
        | 10
        | 15
        | 20
        | 30
        | 40
        | 50
        | 75
        | 100
        | 150
        | 200;
      "conditions.allowList"?: string;
      "conditions.bots"?: boolean;
      "conditions.accountAge"?:
        | 1
        | 3
        | 7
        | 14
        | 30
        | 60
        | 90
        | 180
        | 365
        | 730
        | 1095;
    };
  }) {
    const path = `/api/tournament/${params.id}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournamentFull;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Join an Arena tournament
   */
  async apiTournamentJoin(
    params: { id: string } & {
      body: {
        password?: string;
        team?: string;
        pairMeAsap?: boolean;
      };
    }
  ) {
    const path = `/api/tournament/${params.id}/join` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Pause or leave an Arena tournament
   */
  async apiTournamentWithdraw(params: { id: string }) {
    const path = `/api/tournament/${params.id}/withdraw` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Terminate an Arena tournament
   */
  async apiTournamentTerminate(params: { id: string }) {
    const path = `/api/tournament/${params.id}/terminate` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update a team battle
   */
  async apiTournamentTeamBattlePost(
    params: { id: string } & {
      body: {
        teams: string;
        nbLeaders: number;
      };
    }
  ) {
    const path = `/api/tournament/team-battle/${params.id}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournamentFull;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export games of an Arena tournament
   */
  async gamesByTournament(
    params: { id: string } & {
      player?: string;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
    }
  ) {
    const path = `/api/tournament/${params.id}/games` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get results of an Arena tournament
   */
  async resultsByTournament(
    params: { id: string } & {
      nb?: number;
      sheet?: boolean;
    }
  ) {
    const path = `/api/tournament/${params.id}/results` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get team standing of a team battle
   */
  async teamsByTournament(params: { id: string }) {
    const path = `/api/tournament/${params.id}/teams` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          id: z.string(),
          teams: z.array(
            z.object({
              rank: z.int(),
              id: z.string(),
              score: z.int(),
              players: z.array(
                z.object({
                  user: schemas.LightUser,
                  score: z.int().optional(),
                })
              ),
            })
          ),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get tournaments created by a user
   */
  async apiUserNameTournamentCreated(
    params: { username: string } & {
      nb?: number;
      status?: 10 | 20 | 30;
    }
  ) {
    const path = `/api/user/${params.username}/tournament/created` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get tournaments played by a user
   */
  async apiUserNameTournamentPlayed(
    params: { username: string } & {
      nb?: number;
      performance?: boolean;
    }
  ) {
    const path = `/api/user/${params.username}/tournament/played` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a new Swiss tournament
   */
  async apiSwissNew(
    params: { teamId: string } & {
      body: {
        name?: string;
        "clock.limit":
          | 0
          | 15
          | 30
          | 45
          | 60
          | 90
          | 120
          | 180
          | 240
          | 300
          | 360
          | 420
          | 480
          | 600
          | 900
          | 1200
          | 1500
          | 1800
          | 2400
          | 3000
          | 3600
          | 4200
          | 4800
          | 5400
          | 6000
          | 6600
          | 7200
          | 7800
          | 8400
          | 9000
          | 9600
          | 10200
          | 10800;
        "clock.increment": number;
        nbRounds: number;
        startsAt?: number;
        roundInterval?:
          | -1
          | 5
          | 10
          | 20
          | 30
          | 45
          | 60
          | 120
          | 180
          | 300
          | 600
          | 900
          | 1200
          | 1800
          | 2700
          | 3600
          | 86400
          | 172800
          | 604800
          | 99999999;
        variant?: schemas.VariantKey;
        position?: schemas.SwissFromPositionFEN;
        description?: string;
        rated?: boolean;
        password?: string;
        forbiddenPairings?: string;
        manualPairings?: string;
        chatFor?: 0 | 10 | 20 | 30;
        "conditions.minRating.rating"?:
          | 1000
          | 1100
          | 1200
          | 1300
          | 1400
          | 1500
          | 1600
          | 1700
          | 1800
          | 1900
          | 2000
          | 2100
          | 2200
          | 2300
          | 2400
          | 2500
          | 2600;
        "conditions.maxRating.rating"?:
          | 2200
          | 2100
          | 2000
          | 1900
          | 1800
          | 1700
          | 1600
          | 1500
          | 1400
          | 1300
          | 1200
          | 1100
          | 1000
          | 900
          | 800;
        "conditions.nbRatedGame.nb"?: number;
        "conditions.playYourGames"?: boolean;
        "conditions.allowList"?: string;
      };
    }
  ) {
    const path = `/api/swiss/new/${params.teamId}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.SwissTournament;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Shared path params for methods below --- */

  /**
   * Get info about a Swiss tournament
   */
  async swiss() {
    const path = `/api/swiss/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.SwissTournament;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update a Swiss tournament
   */
  async apiSwissUpdate(
    params: { id: string } & {
      body: {
        name?: string;
        "clock.limit":
          | 0
          | 15
          | 30
          | 45
          | 60
          | 90
          | 120
          | 180
          | 240
          | 300
          | 360
          | 420
          | 480
          | 600
          | 900
          | 1200
          | 1500
          | 1800
          | 2400
          | 3000
          | 3600
          | 4200
          | 4800
          | 5400
          | 6000
          | 6600
          | 7200
          | 7800
          | 8400
          | 9000
          | 9600
          | 10200
          | 10800;
        "clock.increment": number;
        nbRounds: number;
        startsAt?: number;
        roundInterval?:
          | -1
          | 5
          | 10
          | 20
          | 30
          | 45
          | 60
          | 120
          | 180
          | 300
          | 600
          | 900
          | 1200
          | 1800
          | 2700
          | 3600
          | 86400
          | 172800
          | 604800
          | 99999999;
        variant?: schemas.VariantKey;
        position?: schemas.SwissFromPositionFEN;
        description?: string;
        rated?: boolean;
        password?: string;
        forbiddenPairings?: string;
        manualPairings?: string;
        chatFor?: 0 | 10 | 20 | 30;
        "conditions.minRating.rating"?:
          | 1000
          | 1100
          | 1200
          | 1300
          | 1400
          | 1500
          | 1600
          | 1700
          | 1800
          | 1900
          | 2000
          | 2100
          | 2200
          | 2300
          | 2400
          | 2500
          | 2600;
        "conditions.maxRating.rating"?:
          | 2200
          | 2100
          | 2000
          | 1900
          | 1800
          | 1700
          | 1600
          | 1500
          | 1400
          | 1300
          | 1200
          | 1100
          | 1000
          | 900
          | 800;
        "conditions.nbRatedGame.nb"?: number;
        "conditions.playYourGames"?: boolean;
        "conditions.allowList"?: string;
      };
    }
  ) {
    const path = `/api/swiss/${params.id}/edit` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.SwissTournament;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 401: {
        const schema = schemas.SwissUnauthorisedEdit;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Manually schedule the next round
   */
  async apiSwissScheduleNextRound(
    params: { id: string } & { body: { date?: number } }
  ) {
    const path = `/api/swiss/${params.id}/schedule-next-round` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 204: {
        return { status, response } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 401: {
        const schema = schemas.SwissUnauthorisedEdit;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Join a Swiss tournament
   */
  async apiSwissJoin(params: { id: string } & { body: { password?: string } }) {
    const path = `/api/swiss/${params.id}/join` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Pause or leave a swiss tournament
   */
  async apiSwissWithdraw(params: { id: string }) {
    const path = `/api/swiss/${params.id}/withdraw` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Terminate a Swiss tournament
   */
  async apiSwissTerminate(params: { id: string }) {
    const path = `/api/swiss/${params.id}/terminate` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export TRF of a Swiss tournament
   */
  async swissTrf(params: { id: string }) {
    const path = `/swiss/${params.id}.trf` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export games of a Swiss tournament
   */
  async gamesBySwiss(
    params: { id: string } & {
      player?: string;
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
    }
  ) {
    const path = `/api/swiss/${params.id}/games` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get results of a swiss tournament
   */
  async resultsBySwiss(params: { id: string } & { nb?: number }) {
    const path = `/api/swiss/${params.id}/results` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get team swiss tournaments
   */
  async apiTeamSwiss(
    params: { teamId: string } & {
      max?: number;
      status?: schemas.SwissStatus | null;
      createdBy?: string;
      name?: string;
    }
  ) {
    const path = `/api/team/${params.teamId}/swiss` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export one study chapter
   */
  async studyChapterPgn(
    params: {
      studyId: string;
      chapterId: string;
    } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    }
  ) {
    const path =
      `/api/study/${params.studyId}/${params.chapterId}.pgn` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export all chapters
   */
  async studyAllChaptersPgn(
    params: { studyId: string } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    }
  ) {
    const path = `/api/study/${params.studyId}.pgn` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Study metadata
   */
  async studyAllChaptersHead(params: { studyId: string }) {
    const path = `/api/study/${params.studyId}.pgn` as const;
    const { response, status } = await this.requestor.head({ path });
    switch (status) {
      case 204: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Import PGN into a study
   */
  async apiStudyImportPGN(
    params: { studyId: string } & {
      body: {
        pgn: string;
        name?: string;
        orientation?: string;
        variant?: schemas.VariantKey;
      };
    }
  ) {
    const path = `/api/study/${params.studyId}/import-pgn` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.StudyImportPgnChapters;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update PGN tags of a study chapter
   */
  async apiStudyChapterTags(
    params: {
      studyId: string;
      chapterId: string;
    } & { body: { pgn: string } }
  ) {
    const path =
      `/api/study/${params.studyId}/${params.chapterId}/tags` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 204: {
        return { status, response } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export all studies of a user
   */
  async studyExportAllPgn(
    params: { username: string } & {
      clocks?: boolean;
      comments?: boolean;
      variations?: boolean;
      orientation?: boolean;
    }
  ) {
    const path = `/study/by/${params.username}/export.pgn` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * List studies of a user
   */
  async studyListMetadata(params: { username: string }) {
    const path = `/api/study/by/${params.username}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Delete a study chapter
   */
  async apiStudyStudyIdChapterIdDelete(params: {
    studyId: string;
    chapterId: string;
  }) {
    const path = `/api/study/${params.studyId}/${params.chapterId}` as const;
    const { response, status } = await this.requestor.delete({ path });
    switch (status) {
      case 204: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get official broadcasts
   */
  async broadcastsOfficial(params: { nb?: number; html?: boolean }) {
    const path = "/api/broadcast" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get paginated top broadcast previews
   */
  async broadcastsTop(params: { page?: number; html?: boolean }) {
    const path = "/api/broadcast/top" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastTop;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get broadcasts created by a user
   */
  async broadcastsByUser(
    params: { username: string } & {
      page?: number;
      html?: boolean;
    }
  ) {
    const path = `/api/broadcast/by/${params.username}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.object({
          currentPage: z.int(),
          maxPerPage: z.int(),
          currentPageResults: z.array(schemas.BroadcastByUser),
          nbResults: z.int(),
          previousPage: z.int().nullable(),
          nextPage: z.int().nullable(),
          nbPages: z.int(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Search broadcasts
   */
  async broadcastsSearch(params: { page?: number; q?: string }) {
    const path = "/api/broadcast/search" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.object({
          currentPage: z.int(),
          maxPerPage: z.int(),
          currentPageResults: z.array(schemas.BroadcastWithLastRound),
          previousPage: z.int().nullable(),
          nextPage: z.int().nullable(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a broadcast tournament
   */
  async broadcastTourCreate(params: { body: schemas.BroadcastForm }) {
    const path = "/broadcast/new" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastWithRounds;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a broadcast tournament
   */
  async broadcastTourGet(params: { broadcastTournamentId: string }) {
    const path = `/api/broadcast/${params.broadcastTournamentId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastWithRounds;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get players of a broadcast
   */
  async broadcastPlayersGet(params: { broadcastTournamentId: string }) {
    const path = `/broadcast/${params.broadcastTournamentId}/players` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.BroadcastPlayerEntry);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a player from a broadcast
   */
  async broadcastPlayerGet(params: {
    broadcastTournamentId: string;
    playerId: string;
  }) {
    const path =
      `/broadcast/${params.broadcastTournamentId}/players/${params.playerId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastPlayerEntryWithFideAndGames;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update your broadcast tournament
   */
  async broadcastTourUpdate(
    params: { broadcastTournamentId: string } & { body: schemas.BroadcastForm }
  ) {
    const path = `/broadcast/${params.broadcastTournamentId}/edit` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a broadcast round
   */
  async broadcastRoundCreate(
    params: { broadcastTournamentId: string } & {
      body: schemas.BroadcastRoundForm;
    }
  ) {
    const path = `/broadcast/${params.broadcastTournamentId}/new` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastRoundNew;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a broadcast round
   */
  async broadcastRoundGet(params: {
    broadcastTournamentSlug: string;
    broadcastRoundSlug: string;
    broadcastRoundId: string;
  }) {
    const path =
      `/api/broadcast/${params.broadcastTournamentSlug}/${params.broadcastRoundSlug}/${params.broadcastRoundId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastRound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update a broadcast round
   */
  async broadcastRoundUpdate(
    params: { broadcastRoundId: string } & { body: schemas.BroadcastRoundForm }
  ) {
    const path = `/broadcast/round/${params.broadcastRoundId}/edit` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastRound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Reset a broadcast round
   */
  async broadcastRoundReset(params: { broadcastRoundId: string }) {
    const path =
      `/api/broadcast/round/${params.broadcastRoundId}/reset` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Push PGN to a broadcast round
   */
  async broadcastPush(params: { broadcastRoundId: string } & { body: string }) {
    const path =
      `/api/broadcast/round/${params.broadcastRoundId}/push` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastPgnPush;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = z.object({ error: z.string().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream an ongoing broadcast round as PGN
   */
  async broadcastStreamRoundPgn(params: { broadcastRoundId: string }) {
    const path =
      `/api/stream/broadcast/round/${params.broadcastRoundId}.pgn` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export one round as PGN
   */
  async broadcastRoundPgn(params: { broadcastRoundId: string }) {
    const path = `/api/broadcast/round/${params.broadcastRoundId}.pgn` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export all rounds as PGN
   */
  async broadcastAllRoundsPgn(params: { broadcastTournamentId: string }) {
    const path = `/api/broadcast/${params.broadcastTournamentId}.pgn` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get your broadcast rounds
   */
  async broadcastMyRoundsGet(params: { nb?: number }) {
    const path = "/api/broadcast/my-rounds" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a FIDE player
   */
  async fidePlayerGet(params: { playerId: number }) {
    const path = `/api/fide/player/${params.playerId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.FIDEPlayer;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Search FIDE players
   */
  async fidePlayerSearch(params: { q: string }) {
    const path = "/api/fide/player" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.FIDEPlayer);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get current simuls
   */
  async apiSimul() {
    const path = "/api/simul" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          pending: z.array(schemas.Simul).optional(),
          created: z.array(schemas.Simul).optional(),
          started: z.array(schemas.Simul).optional(),
          finished: z.array(schemas.Simul).optional(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get a single team
   */
  async teamShow(params: { teamId: string }) {
    const path = `/api/team/${params.teamId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Team;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get popular teams
   */
  async teamAll(params: { page?: number }) {
    const path = "/api/team/all" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.TeamPaginatorJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Teams of a player
   */
  async teamOfUsername(params: { username: string }) {
    const path = `/api/team/of/${params.username}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.Team);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Search teams
   */
  async teamSearch(params: { text?: string; page?: number }) {
    const path = "/api/team/search" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.TeamPaginatorJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get members of a team
   */
  async teamIdUsers(params: { teamId: string } & { full?: boolean }) {
    const path = `/api/team/${params.teamId}/users` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get team Arena tournaments
   */
  async apiTeamArena(
    params: { teamId: string } & {
      max?: number;
      status?: schemas.ArenaStatusName | null;
      createdBy?: string;
      name?: string;
    }
  ) {
    const path = `/api/team/${params.teamId}/arena` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Join a team
   */
  async teamIdJoin(
    params: { teamId: string } & {
      body: {
        message?: string;
        password?: string;
      };
    }
  ) {
    const path = `/team/${params.teamId}/join` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Leave a team
   */
  async teamIdQuit(params: { teamId: string }) {
    const path = `/team/${params.teamId}/quit` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get join requests
   */
  async teamRequests(params: { teamId: string } & { declined?: boolean }) {
    const path = `/api/team/${params.teamId}/requests` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.TeamRequestWithUser);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Accept join request
   */
  async teamRequestAccept(params: { teamId: string; userId: string }) {
    const path =
      `/api/team/${params.teamId}/request/${params.userId}/accept` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Decline join request
   */
  async teamRequestDecline(params: { teamId: string; userId: string }) {
    const path =
      `/api/team/${params.teamId}/request/${params.userId}/decline` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Kick a user from your team
   */
  async teamIdKickUserId(params: { teamId: string; userId: string }) {
    const path = `/api/team/${params.teamId}/kick/${params.userId}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Message all members
   */
  async teamIdPmAll(
    params: { teamId: string } & { body: { message?: string } }
  ) {
    const path = `/team/${params.teamId}/pm-all` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get live streamers
   */
  async streamerLive() {
    const path = "/api/streamer/live" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(
          z.intersection(
            schemas.LightUser,
            z.object({
              stream: z
                .object({
                  service: z.literal(["twitch", "youTube"]).optional(),
                  status: z.string().optional(),
                  lang: z.string().optional(),
                })
                .optional(),
              streamer: z
                .object({
                  name: z.string().optional(),
                  headline: z.string().optional(),
                  description: z.string().optional(),
                  twitch: z.url().optional(),
                  youTube: z.url().optional(),
                  image: z.url().optional(),
                })
                .optional(),
            })
          )
        );
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get crosstable
   */
  async apiCrosstable(
    params: {
      user1: string;
      user2: string;
    } & { matchup?: boolean }
  ) {
    const path = `/api/crosstable/${params.user1}/${params.user2}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Crosstable;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Autocomplete usernames
   */
  async apiPlayerAutocomplete(params: {
    term: string;
    object?: boolean;
    names?: boolean;
    friend?: boolean;
    team?: string;
    tour?: string;
    swiss?: string;
  }) {
    const path = "/api/player/autocomplete" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = z.union([
          z.array(z.string()),
          z.object({ result: z.array(schemas.LightUserOnline).optional() }),
        ]);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get notes for a user
   */
  async readNote(params: { username: string }) {
    const path = `/api/user/${params.username}/note` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.UserNote);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Add a note for a user
   */
  async writeNote(params: { username: string } & { body: { text: string } }) {
    const path = `/api/user/${params.username}/note` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get users followed by the logged in user
   */
  async apiUserFollowing() {
    const path = "/api/rel/following" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Follow a player
   */
  async followUser(params: { username: string }) {
    const path = `/api/rel/follow/${params.username}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Unfollow a player
   */
  async unfollowUser(params: { username: string }) {
    const path = `/api/rel/unfollow/${params.username}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Block a player
   */
  async blockUser(params: { username: string }) {
    const path = `/api/rel/block/${params.username}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Unblock a player
   */
  async unblockUser(params: { username: string }) {
    const path = `/api/rel/unblock/${params.username}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream incoming events
   */
  async apiStreamEvent() {
    const path = "/api/stream/event" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a seek
   */
  async apiBoardSeek(params: {
    body: {
      rated?: boolean;
      variant?: schemas.VariantKey;
      ratingRange?: string;
    } & (
      | {
          time: number;
          increment: number;
          color?: schemas.ChallengeColor;
        }
      | { days: 1 | 2 | 3 | 5 | 7 | 10 | 14 }
    );
  }) {
    const path = "/api/board/seek" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream Board game state
   */
  async boardGameStream(params: { gameId: string }) {
    const path = `/api/board/game/stream/${params.gameId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Make a Board move
   */
  async boardGameMove(
    params: {
      gameId: string;
      move: string;
    } & { offeringDraw?: boolean }
  ) {
    const path =
      `/api/board/game/${params.gameId}/move/${params.move}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Shared path params for methods below --- */

  /**
   * Fetch the game chat
   */
  async boardGameChatGet() {
    const path = `/api/board/game/${params.gameId}/chat` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Write in the chat
   */
  async boardGameChatPost(params: {
    body: {
      room: string;
      text: string;
    };
  }) {
    const path = `/api/board/game/${params.gameId}/chat` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Abort a game
   */
  async boardGameAbort(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/abort` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Resign a game
   */
  async boardGameResign(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/resign` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Handle draw offers
   */
  async boardGameDraw(params: { gameId: string; accept: boolean }) {
    const path =
      `/api/board/game/${params.gameId}/draw/${params.accept}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Handle takeback offers
   */
  async boardGameTakeback(params: { gameId: string; accept: boolean }) {
    const path =
      `/api/board/game/${params.gameId}/takeback/${params.accept}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Claim victory of a game
   */
  async boardGameClaimVictory(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/claim-victory` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Claim draw of a game
   */
  async boardGameClaimDraw(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/claim-draw` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Berserk a tournament game
   */
  async boardGameBerserk(params: { gameId: string }) {
    const path = `/api/board/game/${params.gameId}/berserk` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get online bots
   */
  async apiBotOnline(params: { nb?: number }) {
    const path = "/api/bot/online" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Upgrade to Bot account
   */
  async botAccountUpgrade() {
    const path = "/api/bot/account/upgrade" as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Stream Bot game state
   */
  async botGameStream(params: { gameId: string }) {
    const path = `/api/bot/game/stream/${params.gameId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Make a Bot move
   */
  async botGameMove(
    params: {
      gameId: string;
      move: string;
    } & { offeringDraw?: boolean }
  ) {
    const path = `/api/bot/game/${params.gameId}/move/${params.move}` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Fetch the game chat
   */
  async botGameChatGet(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/chat` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Write in the chat
   */
  async botGameChat(
    params: { gameId: string } & {
      body: {
        room: string;
        text: string;
      };
    }
  ) {
    const path = `/api/bot/game/${params.gameId}/chat` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Abort a game
   */
  async botGameAbort(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/abort` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Resign a game
   */
  async botGameResign(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/resign` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Handle draw offers
   */
  async botGameDraw(params: { gameId: string; accept: boolean }) {
    const path =
      `/api/bot/game/${params.gameId}/draw/${params.accept}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Handle takeback offers
   */
  async botGameTakeback(params: { gameId: string; accept: boolean }) {
    const path =
      `/api/bot/game/${params.gameId}/takeback/${params.accept}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Claim victory of a game
   */
  async botGameClaimVictory(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/claim-victory` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Claim draw of a game
   */
  async botGameClaimDraw(params: { gameId: string }) {
    const path = `/api/bot/game/${params.gameId}/claim-draw` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * List your challenges
   */
  async challengeList() {
    const path = "/api/challenge" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          in: z.array(schemas.ChallengeJson).optional(),
          out: z.array(schemas.ChallengeJson).optional(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a challenge
   */
  async challengeCreate(
    params: { username: string } & {
      body: (
        | {
            "clock.limit": number;
            "clock.increment": number;
          }
        | { days: 1 | 2 | 3 | 5 | 7 | 10 | 14 }
        | {}
      ) & {
        rated?: boolean;
        color?: schemas.ChallengeColor;
        variant?: schemas.VariantKey;
        fen?: schemas.FromPositionFEN;
        keepAliveStream?: boolean;
        rules?: string;
      };
    }
  ) {
    const path = `/api/challenge/${params.username}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ChallengeJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Show one challenge
   */
  async challengeShow(params: { challengeId: string }) {
    const path = `/api/challenge/${params.challengeId}/show` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.ChallengeJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Accept a challenge
   */
  async challengeAccept(params: { challengeId: string } & { color?: string }) {
    const path = `/api/challenge/${params.challengeId}/accept` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Decline a challenge
   */
  async challengeDecline(
    params: { challengeId: string } & { body: { reason?: string } }
  ) {
    const path = `/api/challenge/${params.challengeId}/decline` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Cancel a challenge
   */
  async challengeCancel(
    params: { challengeId: string } & { opponentToken?: string }
  ) {
    const path = `/api/challenge/${params.challengeId}/cancel` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Challenge the AI
   */
  async challengeAi(params: {
    body: {
      level: number;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      color?: schemas.ChallengeColor;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
    };
  }) {
    const path = "/api/challenge/ai" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 201: {
        const schema = z.object({
          id: z.string().min(8).max(8).optional(),
          variant: schemas.Variant.optional(),
          speed: schemas.Speed.optional(),
          perf: schemas.PerfType.optional(),
          rated: z.boolean().optional(),
          fen: z.string().optional(),
          turns: z.int().optional(),
          source: schemas.GameSource.optional(),
          status: schemas.GameStatus.optional(),
          createdAt: z.int().optional(),
          player: schemas.GameColor.optional(),
          fullId: z.string().min(12).max(12).optional(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Open-ended challenge
   */
  async challengeOpen(params: {
    body: {
      rated?: boolean;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
      name?: string;
      rules?: string;
      users?: string;
      expiresAt?: number;
    };
  }) {
    const path = "/api/challenge/open" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ChallengeOpenJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Start clocks of a game
   */
  async challengeStartClocks(
    params: { gameId: string } & {
      token1: string;
      token2?: string;
    }
  ) {
    const path = `/api/challenge/${params.gameId}/start-clocks` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.post({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * View your bulk pairings
   */
  async bulkPairingList() {
    const path = "/api/bulk-pairing" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.BulkPairing);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create a bulk pairing
   */
  async bulkPairingCreate(params: {
    body: {
      players?: string;
      "clock.limit"?: number;
      "clock.increment"?: number;
      days?: 1 | 2 | 3 | 5 | 7 | 10 | 14;
      pairAt?: number;
      startClocksAt?: number;
      rated?: boolean;
      variant?: schemas.VariantKey;
      fen?: schemas.FromPositionFEN;
      message?: string;
      rules?: string;
    };
  }) {
    const path = "/api/bulk-pairing" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.BulkPairing;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Manually start clocks
   */
  async bulkPairingStartClocks(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}/start-clocks` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Show a bulk pairing
   */
  async bulkPairingGet(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.BulkPairing;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Cancel a bulk pairing
   */
  async bulkPairingDelete(params: { id: string }) {
    const path = `/api/bulk-pairing/${params.id}` as const;
    const { response, status } = await this.requestor.delete({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Export games of a bulk pairing
   */
  async bulkPairingIdGamesGet(
    params: { id: string } & {
      moves?: boolean;
      pgnInJson?: boolean;
      tags?: boolean;
      clocks?: boolean;
      evals?: boolean;
      accuracy?: boolean;
      opening?: boolean;
      division?: boolean;
      literate?: boolean;
    }
  ) {
    const path = `/api/bulk-pairing/${params.id}/games` as const;
    const query = {
      /* ~query~ */
    } as const;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Add time to the opponent clock
   */
  async roundAddTime(params: { gameId: string; seconds: number }) {
    const path =
      `/api/round/${params.gameId}/add-time/${params.seconds}` as const;
    const { response, status } = await this.requestor.post({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Admin challenge tokens
   */
  async adminChallengeTokens(params: {
    body: {
      users: string;
      description: string;
    };
  }) {
    const path = "/api/token/admin-challenge" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.record(z.string(), z.string());
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Send a private message
   */
  async inboxUsername(
    params: { username: string } & { body: { text: string } }
  ) {
    const path = `/inbox/${params.username}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.Error;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Get cloud evaluation of a position.
   */
  async apiCloudEval(params: {
    fen: string;
    multiPv?: number;
    variant?: schemas.VariantKey;
  }) {
    const path = "/api/cloud-eval" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.CloudEval;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 404: {
        const schema = z.object({ error: z.string().optional() });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * List external engines
   */
  async apiExternalEngineList() {
    const path = "/api/external-engine" as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.ExternalEngine);
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Create external engine
   */
  async apiExternalEngineCreate(params: {
    body: schemas.ExternalEngineRegistration;
  }) {
    const path = "/api/external-engine" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ExternalEngine;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Shared path params for methods below --- */

  /**
   * Get external engine
   */
  async apiExternalEngineGet() {
    const path = `/api/external-engine/${params.id}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.ExternalEngine;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Delete external engine
   */
  async apiExternalEngineDelete() {
    const path = `/api/external-engine/${params.id}` as const;
    const { response, status } = await this.requestor.delete({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Update external engine
   */
  async apiExternalEnginePut(params: {
    body: schemas.ExternalEngineRegistration;
  }) {
    const path = `/api/external-engine/${params.id}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.put({ path, body });
    switch (status) {
      case 200: {
        const schema = schemas.ExternalEngine;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://engine.lichess.ovh --- */
  /* --- Shared path params for methods below --- */

  /**
   * Analyse with external engine
   */
  async apiExternalEngineAnalyse(params: {
    body: {
      clientSecret: string;
      work: schemas.ExternalEngineWork;
    };
  }) {
    const path = `/api/external-engine/${params.id}/analyse` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://engine.lichess.ovh --- */

  /**
   * Acquire analysis request
   */
  async apiExternalEngineAcquire(params: { body: { providerSecret: string } }) {
    const path = "/api/external-engine/work" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.object({
          id: z.string(),
          work: schemas.ExternalEngineWork,
          engine: schemas.ExternalEngine,
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 204: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://engine.lichess.ovh --- */
  /* --- Shared path params for methods below --- */

  /**
   * Answer analysis request
   */
  async apiExternalEngineSubmit(params: { body: string }) {
    const path = `/api/external-engine/work/${params.id}` as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Request authorization code
   */
  async oauth(params: {
    response_type: string;
    client_id: string;
    redirect_uri: string;
    code_challenge_method: string;
    code_challenge: string;
    scope?: string;
    username?: string;
    state?: string;
  }) {
    const path = "/oauth" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Obtain access token
   */
  async apiToken(params: {
    body: {
      grant_type?: string;
      code?: string;
      code_verifier?: string;
      redirect_uri?: string;
      client_id?: string;
    };
  }) {
    const path = "/api/token" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.object({
          token_type: z.string(),
          access_token: z.string(),
          expires_in: z.int(),
        });
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      case 400: {
        const schema = schemas.OAuthError;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Revoke access token
   */
  async apiTokenDelete() {
    const path = "/api/token" as const;
    const { response, status } = await this.requestor.delete({ path });
    switch (status) {
      case 204: {
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /**
   * Test multiple OAuth tokens
   */
  async tokenTest(params: { body: string }) {
    const path = "/api/token/test" as const;
    const body = params.body;
    const { response, status } = await this.requestor.post({ path, body });
    switch (status) {
      case 200: {
        const schema = z.record(
          z.string(),
          z.union([
            z.object({
              userId: z.string().optional(),
              scopes: z.string().optional(),
              expires: z.int().nullable().optional(),
            }),
            z.null(),
          ])
        );
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://explorer.lichess.ovh --- */

  /**
   * Masters database
   */
  async openingExplorerMaster(params: {
    fen?: string;
    play?: string;
    since?: number;
    until?: number;
    moves?: number;
    topGames?: number;
  }) {
    const path = "/masters" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.OpeningExplorerMasters;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://explorer.lichess.ovh --- */

  /**
   * Lichess games
   */
  async openingExplorerLichess(params: {
    variant?: schemas.VariantKey;
    fen?: string;
    play?: string;
    speeds?: schemas.Speed[];
    ratings?: (0 | 1000 | 1200 | 1400 | 1600 | 1800 | 2000 | 2200 | 2500)[];
    since?: string;
    until?: string;
    moves?: number;
    topGames?: number;
    recentGames?: number;
    history?: boolean;
  }) {
    const path = "/lichess" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.OpeningExplorerLichess;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://explorer.lichess.ovh --- */

  /**
   * Player games
   */
  async openingExplorerPlayer(params: {
    player: string;
    color: string;
    variant?: schemas.VariantKey;
    fen?: string;
    play?: string;
    speeds?: schemas.Speed[];
    modes?: string[];
    since?: string;
    until?: string;
    moves?: number;
    recentGames?: number;
  }) {
    const path = "/player" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://explorer.lichess.ovh --- */

  /**
   * OTB master game
   */
  async openingExplorerMasterGame(params: { gameId: string }) {
    const path = `/master/pgn/${params.gameId}` as const;
    const { response, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, response } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://tablebase.lichess.ovh --- */

  /**
   * Tablebase lookup
   */
  async tablebaseStandard(params: { fen: string; dtc?: string }) {
    const path = "/standard" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://tablebase.lichess.ovh --- */

  /**
   * Tablebase lookup for Atomic chess
   */
  async tablebaseAtomic(params: { fen: string }) {
    const path = "/atomic" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }

  /* --- Base URL for methods below: https://tablebase.lichess.ovh --- */

  /**
   * Tablebase lookup for Antichess
   */
  async antichessAtomic(params: { fen: string }) {
    const path = "/antichess" as const;
    const query = params;
    const { response, status } = await this.requestor.get({ path, query });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const json: unknown = await response.clone().json();
        const data = schema.parse(json);
        return { status, response, data } as const;
      }
      default: {
        throw new Error("Unexpected status code");
      }
    }
  }
}
