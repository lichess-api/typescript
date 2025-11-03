import * as z from "zod";

import * as schemas from "~/schemas";

import { Requestor } from "./requestor";

export const BASE_URL = "https://lichess.org";
type BASE_URL = typeof BASE_URL;

export class Lichess {
  private readonly requestor: Requestor<BASE_URL>;

  constructor({ token }: { token: string }) {
    this.requestor = new Requestor({ token, baseUrl: BASE_URL });
  }

  /**
   * Read the `online`, `playing` and `streaming` flags of several users.
   * This API is very fast and cheap on lichess side.
   * So you can call it quite often (like once every 5 seconds).
   * Use it to track players and know when they're connected on lichess and playing games.
   */
  async apiUsersStatus(/* params: { ... } */) {
    const path = "/api/users/status" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
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
            patron: z.boolean().optional(),
            patronColor: schemas.PatronColor.optional(),
          })
        );
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the top 10 players for each speed and variant.
   * See <https://lichess.org/player>.
   */
  async player() {
    const path = "/api/player" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Top10s;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the leaderboard for a single speed or variant (a.k.a. `perfType`).
   * There is no leaderboard for correspondence or puzzles.
   * See <https://lichess.org/player/top/200/bullet>.
   */
  async playerTopNbPerfType(/* params: { ... } */) {
    const path = `/api/player/top/${nb}/${perfType}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.Leaderboard;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read public data of a user.
   */
  async apiUser(/* params: { ... } */) {
    const path = `/api/user/${username}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.UserExtended;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read rating history of a user, for all perf types.
   * There is at most one entry per day.
   * Format of an entry is `[year, month, day, rating]`.
   * `month` starts at zero (January).
   */
  async apiUserRatingHistory(/* params: { ... } */) {
    const path = `/api/user/${username}/rating-history` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.RatingHistory;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read performance statistics of a user, for a single performance.
   * Similar to the [performance pages on the website](https://lichess.org/@/thibault/perf/bullet).
   */
  async apiUserPerf(/* params: { ... } */) {
    const path = `/api/user/${username}/perf/${perf}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.PerfStat;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read data to generate the activity feed of a user.
   */
  async apiUserActivity(/* params: { ... } */) {
    const path = `/api/user/${username}/activity` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.UserActivity);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the daily Lichess puzzle in JSON format.
   * Alternatively, you can [post it in your slack workspace](https://lichess.org/daily-puzzle-slack).
   */
  async apiPuzzleDaily() {
    const path = "/api/puzzle/daily" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a single Lichess puzzle in JSON format.
   */
  async apiPuzzleId(/* params: { ... } */) {
    const path = `/api/puzzle/${id}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a random Lichess puzzle in JSON format.
   *
   * If authenticated, only returns puzzles that the user has never seen before.
   *
   * **DO NOT** use this endpoint to enumerate puzzles for mass download. Instead, download the [full public puzzle database](https://database.lichess.org/#puzzles).
   */
  async apiPuzzleNext(/* params: { ... } */) {
    const path = "/api/puzzle/next" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleAndGame;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a batch of random Lichess puzzles in JSON format.
   *
   * If authenticated, only returns puzzles that the user has never seen before.
   *
   * **DO NOT** use this endpoint to enumerate puzzles for mass download. Instead, download the [full public puzzle database](https://database.lichess.org/#puzzles).
   */
  async apiPuzzleBatchSelect(/* params: { ... } */) {
    const path = `/api/puzzle/batch/${angle}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleBatchSelect;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Set puzzles as solved and update ratings.
   */
  async apiPuzzleBatchSolve(/* params: { ... } */) {
    const path = `/api/puzzle/batch/${angle}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download your puzzle activity in [ndjson](#section/Introduction/Streaming-with-ND-JSON) format.
   * Puzzle activity is sorted by reverse chronological order (most recent first)
   * We recommend streaming the response, for it can be very long.
   */
  async apiPuzzleActivity(/* params: { ... } */) {
    const path = "/api/puzzle/activity" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Gets the puzzle IDs of remaining puzzles to re-attempt in JSON format.
   */
  async apiPuzzleReplay(/* params: { ... } */) {
    const path = `/api/puzzle/replay/${days}/${theme}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleReplay;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = z.object({ error: z.string().optional() });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download your [puzzle dashboard](https://lichess.org/training/dashboard/30/dashboard) as JSON.
   * Also includes all puzzle themes played, with aggregated results.
   * Allows re-creating the [improvement/strengths](https://lichess.org/training/dashboard/30/improvementAreas) interfaces.
   */
  async apiPuzzleDashboard(/* params: { ... } */) {
    const path = `/api/puzzle/dashboard/${days}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleDashboard;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download the [storm dashboard](https://lichess.org/storm/dashboard/mrbasso) of any player as JSON.
   * Contains the aggregated highscores, and the history of storm runs aggregated by days.
   * Use `?days=0` if you only care about the highscores.
   */
  async apiStormDashboard(/* params: { ... } */) {
    const path = `/api/storm/dashboard/${username}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleStormDashboard;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a new private [puzzle race](https://lichess.org/racer).
   * The Lichess user who creates the race must join the race page,
   * and manually start the race when enough players have joined.
   * - <https://lichess.org/racer>
   */
  async racerPost() {
    const path = "/api/racer" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the results of a [puzzle race](https://lichess.org/racer).
   * Returns information about players, puzzles, and the current status of the race.
   * - <https://lichess.org/racer>
   *
   * Note that Lichess puzzle races are not persisted, and are only available
   * for 30 minutes. After that delay, they are permanently deleted.
   */
  async racerGet(/* params: { ... } */) {
    const path = `/api/racer/${id}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.PuzzleRaceResults;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get up to 300 users by their IDs. Users are returned in the same order as the IDs.
   * The method is `POST` to allow a longer list of IDs to be sent in the request body.
   * Please do not try to download all the Lichess users with this endpoint, or any other endpoint.
   * An API is not a way to fully export a website. We do not provide a full download of the Lichess users.
   * This endpoint is limited to 8,000 users every 10 minutes, and 120,000 every day.
   */
  async apiUsers() {
    const path = "/api/users" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Public information about the logged in user.
   */
  async accountMe() {
    const path = "/api/account" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.UserExtended;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read the email address of the logged in user.
   */
  async accountEmail() {
    const path = "/api/account/email" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ email: z.string().optional() });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read the preferences of the logged in user.
   * - <https://lichess.org/account/preferences/game-display>
   * - <https://github.com/ornicar/lila/blob/master/modules/pref/src/main/Pref.scala>
   */
  async account() {
    const path = "/api/account/preferences" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          prefs: schemas.UserPreferences.optional(),
          language: z.string().optional(),
        });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Read the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKid() {
    const path = "/api/account/kid" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({ kid: z.boolean().optional() });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Set the kid mode status of the logged in user.
   * - <https://lichess.org/account/kid>
   */
  async accountKidPost(/* params: { ... } */) {
    const path = "/api/account/kid" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the timeline events of the logged in user.
   */
  async timeline(/* params: { ... } */) {
    const path = "/api/timeline" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.Timeline;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download one game in either PGN or JSON format.
   * Ongoing games are delayed by a few seconds ranging from 3 to 60 depending on the time control, as to prevent cheat bots from using this API.
   */
  async gamePgn(/* params: { ... } */) {
    const path = `/game/export/${gameId}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download the ongoing game, or the last game played, of a user.
   * Available in either PGN or JSON format.
   * Ongoing games are delayed by a few seconds ranging from 3 to 60 depending on the time control, as to prevent cheat bots from using this API.
   */
  async apiUserCurrentGame(/* params: { ... } */) {
    const path = `/api/user/${username}/current-game` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all games of any user in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format.
   * Games are sorted by reverse chronological order (most recent first).
   * We recommend streaming the response, for it can be very long.
   * <https://lichess.org/@/german11> for instance has more than 500,000 games.
   * The game stream is throttled, depending on who is making the request:
   *   - Anonymous request: 20 games per second
   *   - [OAuth2 authenticated](#section/Introduction/Authentication) request: 30 games per second
   *   - Authenticated, downloading your own games: 60 games per second
   */
  async apiGamesUser(/* params: { ... } */) {
    const path = `/api/games/user/${username}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download games by IDs in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format, depending on the request `Accept` header.
   * Games are sorted by reverse chronological order (most recent first)
   * The method is `POST` so a longer list of IDs can be sent in the request body.
   * 300 IDs can be submitted.
   * Ongoing games are delayed by a few seconds ranging from 3 to 60 depending on the time control, as to prevent cheat bots from using this API.
   */
  async gamesExportIds(/* params: { ... } */) {
    const path = "/api/games/export/_ids" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream the games played between a list of users, in real time.
   * Only games where **both players** are part of the list are included.
   * The stream emits an event each time a game is started or finished.
   * To also get all current ongoing games at the beginning of the stream, use the `withCurrentGames` flag.
   * Games are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * Maximum number of users: 300.
   * The method is `POST` so a longer list of IDs can be sent in the request body.
   */
  async gamesByUsers(/* params: { ... } */) {
    const path = "/api/stream/games-by-users" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Creates a stream of games from an arbitrary streamId, and a list of game IDs.
   * The stream first outputs the games that already exists, then emits an event each time a game is started or finished.
   * Games are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * Maximum number of games: 500 for anonymous requests, or 1000 for [OAuth2 authenticated](#section/Introduction/Authentication) requests.
   * While the stream is open, it is possible to [add new game IDs to watch](#operation/gamesByIdsAdd).
   */
  async gamesByIds(/* params: { ... } */) {
    const path = `/api/stream/games/${streamId}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Add new game IDs for [an existing stream](#operation/gamesByIds) to watch.
   * The stream will immediately outputs the games that already exists, then emit an event each time a game is started or finished.
   */
  async gamesByIdsAdd(/* params: { ... } */) {
    const path = `/api/stream/games/${streamId}/add` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the ongoing games of the current user.
   * Real-time and correspondence games are included.
   * The most urgent games are listed first.
   */
  async apiAccountPlaying(/* params: { ... } */) {
    const path = "/api/account/playing" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
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
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream positions and moves of any ongoing game, in [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * A description of the game is sent as a first message.
   * Then a message is sent each time a move is played.
   * Finally, a description of the game is sent when it finishes, and the stream is closed.
   * Ongoing games are delayed by a few seconds ranging from 3 to 60 depending on the time control, as to prevent cheat bots from using this API.
   * No more than 8 game streams can be opened at the same time from the same IP address.
   */
  async streamGame(/* params: { ... } */) {
    const path = `/api/stream/game/${id}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      case 429: {
        const schema = z.object({ error: z.string().optional() });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Import a game from PGN. See <https://lichess.org/paste>.
   * Rate limiting: 200 games per hour for OAuth requests, 100 games per hour for anonymous requests.
   * To broadcast ongoing games, consider [pushing to a broadcast instead](#operation/broadcastPush).
   * To analyse a position or a line, just construct an analysis board URL (most standard tags supported if URL-encoded):
   * [https://lichess.org/analysis/pgn/e4_e5_Nf3_Nc6_Bc4_Bc5_Bxf7+](https://lichess.org/analysis/pgn/e4_e5_Nf3_Nc6_Bc4_Bc5_Bxf7+)
   */
  async gameImport() {
    const path = "/api/import" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all games imported by you. Games are exported in PGN format.
   */
  async apiImportedGamesUser() {
    const path = "/api/games/export/imports" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all games bookmarked by you, in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format.
   * Games are sorted by reverse chronological order (most recent first).
   * We recommend streaming the response, for it can be very long.
   */
  async apiExportBookmarks(/* params: { ... } */) {
    const path = "/api/games/export/bookmarks" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get basic info about the best games being played for each speed and variant,
   * but also computer games and bot games.
   * See [lichess.org/tv](https://lichess.org/tv).
   */
  async tvChannels() {
    const path = "/api/tv/channels" as const;
    const { json, status } = await this.requestor.get({ path });
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
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream positions and moves of the current [TV game](https://lichess.org/tv) in [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * Try it with `curl https://lichess.org/api/tv/feed`.
   */
  async tvFeed() {
    const path = "/api/tv/feed" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream positions and moves of a current [TV channel's game](https://lichess.org/tv/rapid) in [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * Try it with `curl https://lichess.org/api/tv/rapid/feed`.
   */
  async tvChannelFeed(/* params: { ... } */) {
    const path = `/api/tv/${channel}/feed` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a list of ongoing games for a given TV channel. Similar to [lichess.org/games](https://lichess.org/games).
   * Available in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format, depending on the request `Accept` header.
   */
  async tvChannelGames(/* params: { ... } */) {
    const path = `/api/tv/${channel}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get recently active and finished tournaments.
   * This API is used to display the [Lichess tournament schedule](https://lichess.org/tournament).
   */
  async apiTournament() {
    const path = "/api/tournament" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournaments;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a public or private Arena tournament.
   * This endpoint mirrors the form on <https://lichess.org/tournament/new>.
   * You can create up to 12 public tournaments per day, or 24 private tournaments.
   * A team battle can be created by specifying the `teamBattleByTeam` argument.
   * Additional restrictions:
   *   - clockTime + clockIncrement > 0
   *   - 15s and 0+1 variant tournaments cannot be rated
   *   - Clock time in comparison to tournament length must be reasonable: 3 <= (minutes * 60) / (96 * clockTime + 48 * clockIncrement + 15) <= 150
   */
  async apiTournamentPost() {
    const path = "/api/tournament" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Shared params for methods below */

  /**
   * Get detailed info about recently finished, current, or upcoming tournament's duels, player standings, and other info.
   */
  async tournament(/* params: { ... } */) {
    const path = `/api/tournament/${id}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.ArenaTournamentFull;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Update an Arena tournament.
   * Be mindful not to make important changes to ongoing tournaments.
   * Can be used to update a team battle.
   * Additional restrictions:
   *   - clockTime + clockIncrement > 0
   *   - 15s and 0+1 variant tournaments cannot be rated
   *   - Clock time in comparison to tournament length must be reasonable: 3 <= (minutes * 60) / (96 * clockTime + 48 * clockIncrement + 15) <= 150
   */
  async apiTournamentUpdate() {
    const path = `/api/tournament/${id}` as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Join an Arena tournament, possibly with a password and/or a team.
   * Also unpauses if you had previously [paused](#operation/apiTournamentWithdraw) the tournament.
   */
  async apiTournamentJoin(/* params: { ... } */) {
    const path = `/api/tournament/${id}/join` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Leave a future Arena tournament, or take a break on an ongoing Arena tournament.
   * It's possible to join again later. Points and streaks are preserved.
   */
  async apiTournamentWithdraw(/* params: { ... } */) {
    const path = `/api/tournament/${id}/withdraw` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Terminate an Arena tournament
   */
  async apiTournamentTerminate(/* params: { ... } */) {
    const path = `/api/tournament/${id}/terminate` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Set the teams and number of leaders of a team battle.
   * To update the other attributes of a team battle, use the [tournament update endpoint](#operation/apiTournamentUpdate).
   */
  async apiTournamentTeamBattlePost(/* params: { ... } */) {
    const path = `/api/tournament/team-battle/${id}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download games of a tournament in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format.
   * Games are sorted by reverse chronological order (most recent first).
   * The game stream is throttled, depending on who is making the request:
   *   - Anonymous request: 20 games per second
   *   - [OAuth2 authenticated](#section/Introduction/Authentication) request: 30 games per second
   */
  async gamesByTournament(/* params: { ... } */) {
    const path = `/api/tournament/${id}/games` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Players of an Arena tournament, with their score and performance, sorted by rank (best first).
   * **Players are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON)**, i.e. one JSON object per line.
   * If called on an ongoing tournament, results can be inconsistent
   * due to ranking changes while the players are being streamed.
   * Use on finished tournaments for guaranteed consistency.
   */
  async resultsByTournament(/* params: { ... } */) {
    const path = `/api/tournament/${id}/results` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Teams of a team battle tournament, with top players, sorted by rank (best first).
   */
  async teamsByTournament(/* params: { ... } */) {
    const path = `/api/tournament/${id}/teams` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
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
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get all tournaments created by a given user.
   * Tournaments are sorted by reverse chronological order of start date (last starting first).
   * Tournaments are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * The stream is throttled, depending on who is making the request:
   *   - Anonymous request: 20 tournaments per second
   *   - [OAuth2 authenticated](#section/Introduction/Authentication) request: 30 tournaments per second
   *   - Authenticated, downloading your own tournaments: 50 tournaments per second
   */
  async apiUserNameTournamentCreated(/* params: { ... } */) {
    const path = `/api/user/${username}/tournament/created` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get all tournaments played by a given user.
   * Tournaments are sorted by reverse chronological order of start date (last played first).
   * Tournaments are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * The stream is throttled, depending on who is making the request:
   *   - Anonymous request: 20 tournaments per second
   *   - [OAuth2 authenticated](#section/Introduction/Authentication) request: 30 tournaments per second
   *   - Authenticated, downloading your own tournaments: 50 tournaments per second
   */
  async apiUserNameTournamentPlayed(/* params: { ... } */) {
    const path = `/api/user/${username}/tournament/played` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a Swiss tournament for your team.
   * This endpoint mirrors the Swiss tournament form from your team pagee.
   * You can create up to 12 tournaments per day.
   * Additional restrictions:
   *   - clock.limit + clock.increment > 0
   *   - 15s and 0+1 variant tournaments cannot be rated
   */
  async apiSwissNew(/* params: { ... } */) {
    const path = `/api/swiss/new/${teamId}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Shared params for methods below */

  /**
   * Get detailed info about a Swiss tournament.
   */
  async swiss() {
    const path = `/api/swiss/${id}` as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.SwissTournament;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Update a Swiss tournament.
   * Be mindful not to make important changes to ongoing tournaments.
   * Additional restrictions:
   *   - clock.limit + clock.increment > 0
   *   - 15s and 0+1 variant tournaments cannot be rated
   */
  async apiSwissUpdate(/* params: { ... } */) {
    const path = `/api/swiss/${id}/edit` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Manually schedule the next round date and time of a Swiss tournament.
   * This sets the `roundInterval` field to `99999999`, i.e. manual scheduling.
   * All further rounds will need to be manually scheduled, unless the `roundInterval` field is changed back to automatic scheduling.
   */
  async apiSwissScheduleNextRound(/* params: { ... } */) {
    const path = `/api/swiss/${id}/schedule-next-round` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Join a Swiss tournament, possibly with a password.
   */
  async apiSwissJoin(/* params: { ... } */) {
    const path = `/api/swiss/${id}/join` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Leave a future Swiss tournament, or take a break on an ongoing Swiss tournament.
   * It's possible to join again later. Points are preserved.
   */
  async apiSwissWithdraw(/* params: { ... } */) {
    const path = `/api/swiss/${id}/withdraw` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Terminate a Swiss tournament
   */
  async apiSwissTerminate(/* params: { ... } */) {
    const path = `/api/swiss/${id}/terminate` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download a tournament in the Tournament Report File format, the FIDE standard.
   * Documentation: <https://www.fide.com/FIDE/handbook/C04Annex2_TRF16.pdf>
   * Example: <https://lichess.org/swiss/j8rtJ5GL.trf>
   */
  async swissTrf(/* params: { ... } */) {
    const path = `/swiss/${id}.trf` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download games of a swiss tournament in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format.
   * Games are sorted by chronological order.
   * The game stream is throttled, depending on who is making the request:
   *   - Anonymous request: 20 games per second
   *   - [OAuth2 authenticated](#section/Introduction/Authentication) request: 30 games per second
   */
  async gamesBySwiss(/* params: { ... } */) {
    const path = `/api/swiss/${id}/games` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Players of a swiss tournament, with their score and performance, sorted by rank (best first).
   * Players are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * If called on an ongoing tournament, results can be inconsistent
   * due to ranking changes while the players are being streamed.
   * Use on finished tournaments for guaranteed consistency.
   */
  async resultsBySwiss(/* params: { ... } */) {
    const path = `/api/swiss/${id}/results` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get all swiss tournaments of a team.
   * Tournaments are sorted by reverse chronological order of start date (last starting first).
   * Tournaments are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async apiTeamSwiss(/* params: { ... } */) {
    const path = `/api/team/${teamId}/swiss` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download one study chapter in PGN format.
   * If authenticated, then all public, unlisted, and private study chapters are read.
   * If not, only public (non-unlisted) study chapters are read.
   */
  async studyChapterPgn(/* params: { ... } */) {
    const path = `/api/study/${studyId}/${chapterId}.pgn` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all chapters of a study in PGN format.
   * If authenticated, then all public, unlisted, and private study chapters are read.
   * If not, only public (non-unlisted) study chapters are read.
   */
  async studyAllChaptersPgn(/* params: { ... } */) {
    const path = `/api/study/${studyId}.pgn` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Only get the study headers, including `Last-Modified`.
   */
  async studyAllChaptersHead(/* params: { ... } */) {
    const path = `/api/study/${studyId}.pgn` as const;

    const { json, status } = await this.requestor.head({ path /* body */ });
    switch (status) {
      case 204: {
        /* no content */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Imports arbitrary PGN into an existing [study](https://lichess.org/study). Creates a new chapter in the study.
   * If the PGN contains multiple games (separated by 2 or more newlines)
   * then multiple chapters will be created within the study.
   * Note that a study can contain at most 64 chapters.
   */
  async apiStudyImportPGN(/* params: { ... } */) {
    const path = `/api/study/${studyId}/import-pgn` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Add, update and delete the PGN tags of a study.
   * By providing a list of PGN tags in the usual PGN format, you can:
   * - Add new tags if the chapter doesn't have them yet
   * - Update existing chapter tags
   * - Delete existing chapter tags, by providing a tag with an empty value.
   *
   * The chapter keeps the tags that you don't provide.
   */
  async apiStudyChapterTags(/* params: { ... } */) {
    const path = `/api/study/${studyId}/${chapterId}/tags` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all chapters of all studies of a user in PGN format.
   * If authenticated, then all public, unlisted, and private studies are included.
   * If not, only public (non-unlisted) studies are included.
   */
  async studyExportAllPgn(/* params: { ... } */) {
    const path = `/study/by/${username}/export.pgn` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get metadata (name and dates) of all studies of a user.
   * If authenticated, then all public, unlisted, and private studies are included.
   * If not, only public (non-unlisted) studies are included.
   * Studies are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async studyListMetadata(/* params: { ... } */) {
    const path = `/api/study/by/${username}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Delete a chapter of a study you own. This is definitive.
   * A study must have at least one chapter; so if you delete the last chapter,
   * an empty one will be automatically created to replace it.
   */
  async apiStudyStudyIdChapterIdDelete(/* params: { ... } */) {
    const path = `/api/study/${studyId}/${chapterId}` as const;

    const { json, status } = await this.requestor.delete({ path /* body */ });
    switch (status) {
      case 204: {
        /* no content */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Returns ongoing official broadcasts sorted by tier.
   * After that, returns finished broadcasts sorted by most recent sync time.
   * Broadcasts are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async broadcastsOfficial(/* params: { ... } */) {
    const path = "/api/broadcast" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * The same data, in the same order, as can be seen on [https://lichess.org/broadcast](/broadcast).
   */
  async broadcastsTop(/* params: { ... } */) {
    const path = "/api/broadcast/top" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastTop;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get all incoming, ongoing, and finished official broadcasts.
   * The broadcasts are sorted by created date, most recent first.
   *
   * If you are authenticated as the user whose broadcasts you are requesting, you will also see your private and unlisted broadcasts.
   */
  async broadcastsByUser(/* params: { ... } */) {
    const path = `/api/broadcast/by/${username}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
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
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Search across recent official broadcasts.
   */
  async broadcastsSearch(/* params: { ... } */) {
    const path = "/api/broadcast/search" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = z.object({
          currentPage: z.int(),
          maxPerPage: z.int(),
          currentPageResults: z.array(schemas.BroadcastWithLastRound),
          previousPage: z.int().nullable(),
          nextPage: z.int().nullable(),
        });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a new broadcast tournament to relay external games.
   * This endpoint accepts the same form data as the [web form](https://lichess.org/broadcast/new).
   */
  async broadcastTourCreate() {
    const path = "/broadcast/new" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get information about a broadcast tournament.
   */
  async broadcastTourGet(/* params: { ... } */) {
    const path = `/api/broadcast/${broadcastTournamentId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastWithRounds;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the list of players of a broadcast tournament, if available.
   */
  async broadcastPlayersGet(/* params: { ... } */) {
    const path = `/broadcast/${broadcastTournamentId}/players` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.BroadcastPlayerEntry);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the details of a specific player and their games from a broadcast tournament.
   */
  async broadcastPlayerGet(/* params: { ... } */) {
    const path =
      `/broadcast/${broadcastTournamentId}/players/${playerId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastPlayerEntryWithFideAndGames;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Update information about a broadcast tournament that you created.
   * This endpoint accepts the same form data as the web form.
   * All fields must be populated with data. Missing fields will override the broadcast with empty data.
   */
  async broadcastTourUpdate(/* params: { ... } */) {
    const path = `/broadcast/${broadcastTournamentId}/edit` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a new broadcast round to relay external games.
   * This endpoint accepts the same form data as the web form.
   *
   * Choose one between `syncUrl`, `syncUrls`, `syncIds` and `syncUsers`, if it is missing, the broadcast needs to be fed by [pushing PGN to it](#operation/broadcastPush)
   */
  async broadcastRoundCreate(/* params: { ... } */) {
    const path = `/broadcast/${broadcastTournamentId}/new` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get information about a broadcast round.
   */
  async broadcastRoundGet(/* params: { ... } */) {
    const path =
      `/api/broadcast/${broadcastTournamentSlug}/${broadcastRoundSlug}/${broadcastRoundId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.BroadcastRound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Update information about a broadcast round.
   * This endpoint accepts the same form data as the web form.
   * All fields must be populated with data. Missing fields will override the broadcast with empty data.
   * For instance, if you omit `startDate`, then any pre-existing start date will be removed.
   */
  async broadcastRoundUpdate(/* params: { ... } */) {
    const path = `/broadcast/round/${broadcastRoundId}/edit` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Remove any games from the broadcast round and reset it to its initial state.
   */
  async broadcastRoundReset(/* params: { ... } */) {
    const path = `/api/broadcast/round/${broadcastRoundId}/reset` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Update a broadcast with new PGN.
   * Only for broadcasts without a source URL.
   */
  async broadcastPush(/* params: { ... } */) {
    const path = `/api/broadcast/round/${broadcastRoundId}/push` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * This streaming endpoint first sends all games of a broadcast round in PGN format.
   * Then, it waits for new moves to be played. As soon as it happens, the entire PGN of the game is sent to the stream.
   * The stream will also send PGNs when games are added to the round.
   * This is the best way to get updates about an ongoing round. Streaming means no polling,
   * and no pollings means no latency, and minimum impact on the server.
   */
  async broadcastStreamRoundPgn(/* params: { ... } */) {
    const path = `/api/stream/broadcast/round/${broadcastRoundId}.pgn` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all games of a single round of a broadcast tournament in PGN format.
   * You *could* poll this endpoint to get updates about a tournament, but it would be slow,
   * and very inefficient.
   * Instead, consider [streaming the tournament](#operation/broadcastStreamRoundPgn) to get
   * a new PGN every time a game is updated, in real-time.
   */
  async broadcastRoundPgn(/* params: { ... } */) {
    const path = `/api/broadcast/round/${broadcastRoundId}.pgn` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download all games of all rounds of a broadcast in PGN format.
   * If a `study:read` [OAuth token](#tag/OAuth) is provided,
   * the private rounds where the user is a contributor will be available.
   * You may want to [download only the games of a single round](#operation/broadcastRoundPgn) instead.
   */
  async broadcastAllRoundsPgn(/* params: { ... } */) {
    const path = `/api/broadcast/${broadcastTournamentId}.pgn` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream all broadcast rounds you are a member of.
   * Also includes broadcasts rounds you did not create, but were invited to.
   * Also includes broadcasts rounds where you're a non-writing member. See the `writeable` flag in the response.
   * Rounds are ordered by rank, which is roughly chronological, most recent first, slightly pondered with popularity.
   */
  async broadcastMyRoundsGet(/* params: { ... } */) {
    const path = "/api/broadcast/my-rounds" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get information about a FIDE player.
   */
  async fidePlayerGet(/* params: { ... } */) {
    const path = `/api/fide/player/${playerId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.FIDEPlayer;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * List of FIDE players search results for a query.
   */
  async fidePlayerSearch(/* params: { ... } */) {
    const path = "/api/fide/player" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.FIDEPlayer);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get recently created, started, finished, simuls.
   * Created and finished simul lists are not exhaustives, only those with
   * strong enough host will be listed, the same filter is used to display simuls on https://lichess.org/simul.
   * When [authenticated with OAuth2](#section/Introduction/Authentication), the pending list will be populated with your created, but unstarted simuls.
   */
  async apiSimul() {
    const path = "/api/simul" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          pending: z.array(schemas.Simul).optional(),
          created: z.array(schemas.Simul).optional(),
          started: z.array(schemas.Simul).optional(),
          finished: z.array(schemas.Simul).optional(),
        });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Public info about a team. Includes the list of publicly visible leaders.
   */
  async teamShow(/* params: { ... } */) {
    const path = `/api/team/${teamId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.Team;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Paginator of the most popular teams.
   */
  async teamAll(/* params: { ... } */) {
    const path = "/api/team/all" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.TeamPaginatorJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * All the teams a player is a member of.
   */
  async teamOfUsername(/* params: { ... } */) {
    const path = `/api/team/of/${username}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.Team);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Paginator of team search results for a keyword.
   */
  async teamSearch(/* params: { ... } */) {
    const path = "/api/team/search" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.TeamPaginatorJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Members are sorted by reverse chronological order of joining the team (most recent first).
   * OAuth is only required if the list of members is private.
   * Up to 5,000 users are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async teamIdUsers(/* params: { ... } */) {
    const path = `/api/team/${teamId}/users` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get all Arena tournaments relevant to a team.
   * Tournaments are sorted by reverse chronological order of start date (last starting first).
   * Tournaments are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async apiTeamArena(/* params: { ... } */) {
    const path = `/api/team/${teamId}/arena` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Join a team.
   * If the team requires a password but the `password` field is incorrect,
   * then the call fails with `403 Forbidden`.
   * Similarly, if the team join policy requires a confirmation but the
   * `message` parameter is not given, then the call fails with
   * `403 Forbidden`.
   */
  async teamIdJoin(/* params: { ... } */) {
    const path = `/team/${teamId}/join` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Leave a team.
   * - <https://lichess.org/team>
   */
  async teamIdQuit(/* params: { ... } */) {
    const path = `/team/${teamId}/quit` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get pending join requests of your team
   */
  async teamRequests(/* params: { ... } */) {
    const path = `/api/team/${teamId}/requests` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.TeamRequestWithUser);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Accept someone's request to join your team
   */
  async teamRequestAccept(/* params: { ... } */) {
    const path = `/api/team/${teamId}/request/${userId}/accept` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Decline someone's request to join your team
   */
  async teamRequestDecline(/* params: { ... } */) {
    const path = `/api/team/${teamId}/request/${userId}/decline` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Kick a member out of one of your teams.
   * - <https://lichess.org/team>
   */
  async teamIdKickUserId(/* params: { ... } */) {
    const path = `/api/team/${teamId}/kick/${userId}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Send a private message to all members of a team.
   * You must be a team leader with the "Messages" permission.
   */
  async teamIdPmAll(/* params: { ... } */) {
    const path = `/team/${teamId}/pm-all` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get basic info about currently streaming users.
   * This API is very fast and cheap on lichess side.
   * So you can call it quite often (like once every 5 seconds).
   */
  async streamerLive() {
    const path = "/api/streamer/live" as const;
    const { json, status } = await this.requestor.get({ path });
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
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get total number of games, and current score, of any two users.
   * If the `matchup` flag is provided, and the users are currently playing, also gets the current match game number and scores.
   */
  async apiCrosstable(/* params: { ... } */) {
    const path = `/api/crosstable/${user1}/${user2}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.Crosstable;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Provides autocompletion options for an incomplete username.
   */
  async apiPlayerAutocomplete(/* params: { ... } */) {
    const path = "/api/player/autocomplete" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = z.union([
          z.array(z.string()),
          z.object({ result: z.array(schemas.LightUserOnline).optional() }),
        ]);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the private notes that you have added for a user.
   */
  async readNote(/* params: { ... } */) {
    const path = `/api/user/${username}/note` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.UserNote);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Add a private note available only to you about this account.
   */
  async writeNote(/* params: { ... } */) {
    const path = `/api/user/${username}/note` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Users are streamed as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   */
  async apiUserFollowing() {
    const path = "/api/rel/following" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Follow a player, adding them to your list of Lichess friends.
   */
  async followUser(/* params: { ... } */) {
    const path = `/api/rel/follow/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Unfollow a player, removing them from your list of Lichess friends.
   */
  async unfollowUser(/* params: { ... } */) {
    const path = `/api/rel/unfollow/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Block a player, adding them to your list of blocked Lichess users.
   */
  async blockUser(/* params: { ... } */) {
    const path = `/api/rel/block/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Unblock a player, removing them from your list of blocked Lichess users.
   */
  async unblockUser(/* params: { ... } */) {
    const path = `/api/rel/unblock/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream the events reaching a lichess user in real time as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   *
   * An empty line is sent every 7 seconds for keep alive purposes.
   *
   * Each non-empty line is a JSON object containing a `type` field. Possible values are:
   * - `gameStart` Start of a game
   * - `gameFinish` Completion of a game
   * - `challenge` A player sends you a challenge or you challenge someone
   * - `challengeCanceled` A player cancels their challenge to you
   * - `challengeDeclined` The opponent declines your challenge
   *
   * When the stream opens, all current challenges and games are sent.
   *
   * Only one global event stream can be active at a time. When the stream opens, the previous one with the same access token is closed.
   */
  async apiStreamEvent() {
    const path = "/api/stream/event" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a public seek, to start a game with a random player.
   *
   * ### Real-time seek
   *
   * Specify the `time` and `increment` clock values.
   * The response is streamed but doesn't contain any information.
   *
   * **Keep the connection open to keep the seek active**.
   *
   * If the client closes the connection, the seek is canceled. This way, if the client terminates, the user won't be paired in a game they wouldn't play.
   * When the seek is accepted, or expires, the server closes the connection.
   *
   * **Make sure to also have an [Event stream](#operation/apiStreamEvent) open**, to be notified when a game starts.
   * We recommend opening the [Event stream](#operation/apiStreamEvent) first, then the seek stream. This way,
   * you won't miss the game event if the seek is accepted immediately.
   *
   * ### Correspondence seek
   *
   * Specify the `days` per turn value.
   * The response is not streamed, it immediately completes with the seek ID. The seek remains active on the server until it is joined by someone.
   */
  async apiBoardSeek() {
    const path = "/api/board/seek" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream the state of a game being played with the Board API, as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   *
   * Use this endpoint to get updates about the game in real-time, with a single request.
   *
   * Each line is a JSON object containing a `type` field. Possible values are:
   *   - `gameFull` Full game data. All values are immutable, except for the `state` field.
   *   - `gameState` Current state of the game. Immutable values not included. Sent when a move is played, a draw is offered, or when the game ends.
   *   - `chatLine` Chat message sent by a user in the `room` "player" or "spectator".
   *   - `opponentGone` Whether the opponent has left the game, and how long before you can claim a win or draw.
   *
   * The first line is always of type `gameFull`.
   *
   * The server closes the stream when the game ends, or if the game has already ended.
   */
  async boardGameStream(/* params: { ... } */) {
    const path = `/api/board/game/stream/${gameId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Make a move in a game being played with the Board API.
   * The move can also contain a draw offer/agreement.
   */
  async boardGameMove(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/move/${move}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Shared params for methods below */

  /**
   * Get the messages posted in the game chat
   */
  async boardGameChatGet() {
    const path = `/api/board/game/${gameId}/chat` as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Post a message to the player or spectator chat, in a game being played with the Board API.
   */
  async boardGameChatPost() {
    const path = `/api/board/game/${gameId}/chat` as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Abort a game being played with the Board API.
   */
  async boardGameAbort(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/abort` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Resign a game being played with the Board API.
   */
  async boardGameResign(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/resign` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create/accept/decline draw offers.
   * - `yes`: Offer a draw, or accept the opponent's draw offer.
   * - `no`: Decline a draw offer from the opponent.
   */
  async boardGameDraw(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/draw/${accept}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create/accept/decline takebacks.
   * - `yes`: Propose a takeback, or accept the opponent's takeback offer.
   * - `no`: Decline a takeback offer from the opponent.
   */
  async boardGameTakeback(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/takeback/${accept}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Claim victory when the opponent has left the game for a while.
   */
  async boardGameClaimVictory(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/claim-victory` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Claim draw when the opponent has left the game for a while.
   */
  async boardGameClaimDraw(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/claim-draw` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Go berserk on an arena tournament game. Halves the clock time, grants an extra point upon winning.
   * Only available in arena tournaments that allow berserk, and before each player has made a move.
   */
  async boardGameBerserk(/* params: { ... } */) {
    const path = `/api/board/game/${gameId}/berserk` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream the [online bot users](https://lichess.org/player/bots), as [ndjson](#section/Introduction/Streaming-with-ND-JSON). Throttled to 50 bot users per second.
   */
  async apiBotOnline(/* params: { ... } */) {
    const path = "/api/bot/online" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Upgrade a lichess player account into a Bot account. Only Bot accounts can use the Bot API.
   * The account **cannot have played any game** before becoming a Bot account. The upgrade is **irreversible**. The account will only be able to play as a Bot.
   * To upgrade an account to Bot, use the [official lichess-bot client](https://github.com/lichess-bot-devs/lichess-bot), or follow these steps:
   * - Create an [API access token](https://lichess.org/account/oauth/token/create?scopes[]=bot:play) with "Play bot moves" permission.
   * - `curl -d '' https://lichess.org/api/bot/account/upgrade -H "Authorization: Bearer <yourTokenHere>"`
   * To know if an account has already been upgraded, use the [Get my profile API](#operation/accountMe):
   * the `title` field should be set to `BOT`.
   */
  async botAccountUpgrade() {
    const path = "/api/bot/account/upgrade" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Stream the state of a game being played with the Bot API, as [ndjson](#section/Introduction/Streaming-with-ND-JSON).
   * Use this endpoint to get updates about the game in real-time, with a single request.
   * Each line is a JSON object containing a `type` field. Possible values are:
   * - `gameFull` Full game data. All values are immutable, except for the `state` field.
   * - `gameState` Current state of the game. Immutable values not included.
   * - `chatLine` Chat message sent by a user (or the bot itself) in the `room` "player" or "spectator".
   * - `opponentGone` Whether the opponent has left the game, and how long before you can claim a win or draw.
   * The first line is always of type `gameFull`.
   */
  async botGameStream(/* params: { ... } */) {
    const path = `/api/bot/game/stream/${gameId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Make a move in a game being played with the Bot API.
   * The move can also contain a draw offer/agreement.
   */
  async botGameMove(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/move/${move}` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the messages posted in the game chat
   */
  async botGameChatGet(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/chat` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Post a message to the player or spectator chat, in a game being played with the Bot API.
   */
  async botGameChat(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/chat` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Abort a game being played with the Bot API.
   */
  async botGameAbort(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/abort` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Resign a game being played with the Bot API.
   */
  async botGameResign(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/resign` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create/accept/decline draw offers with the Bot API.
   * - `yes`: Offer a draw, or accept the opponent's draw offer.
   * - `no`: Decline a draw offer from the opponent.
   */
  async botGameDraw(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/draw/${accept}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create/accept/decline takebacks with the Bot API.
   * - `yes`: Propose a takeback, or accept the opponent's takeback offer.
   * - `no`: Decline a takeback offer from the opponent.
   */
  async botGameTakeback(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/takeback/${accept}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Claim victory when the opponent has left the game for a while.
   */
  async botGameClaimVictory(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/claim-victory` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Claim draw when the opponent has left the game for a while.
   */
  async botGameClaimDraw(/* params: { ... } */) {
    const path = `/api/bot/game/${gameId}/claim-draw` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a list of challenges created by or targeted at you.
   */
  async challengeList() {
    const path = "/api/challenge" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.object({
          in: z.array(schemas.ChallengeJson).optional(),
          out: z.array(schemas.ChallengeJson).optional(),
        });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Challenge someone to play. The targeted player can choose to accept or decline.
   * If the challenge is accepted, you will be notified on the [event stream](#operation/apiStreamEvent)
   * that a new game has started. The game ID will be the same as the challenge ID.
   * Challenges for realtime games (not correspondence) expire after 20s if not accepted.
   * To prevent that, use the `keepAliveStream` flag described below.
   */
  async challengeCreate(/* params: { ... } */) {
    const path = `/api/challenge/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get details about a challenge, even if it has been recently accepted, canceled or declined.
   */
  async challengeShow(/* params: { ... } */) {
    const path = `/api/challenge/${challengeId}/show` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.ChallengeJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Accept an incoming challenge.
   * You should receive a `gameStart` event on the [incoming events stream](#operation/apiStreamEvent).
   */
  async challengeAccept(/* params: { ... } */) {
    const path = `/api/challenge/${challengeId}/accept` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Decline an incoming challenge.
   */
  async challengeDecline(/* params: { ... } */) {
    const path = `/api/challenge/${challengeId}/decline` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Cancel a challenge you sent, or aborts the game if the challenge was accepted, but the game was not yet played.
   * Note that the ID of a game is the same as the ID of the challenge that created it.
   * Works for user challenges and open challenges alike.
   */
  async challengeCancel(/* params: { ... } */) {
    const path = `/api/challenge/${challengeId}/cancel` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Start a game with Lichess AI.
   * You will be notified on the [event stream](#operation/apiStreamEvent) that a new game has started.
   */
  async challengeAi() {
    const path = "/api/challenge/ai" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Create a challenge that any 2 players can join.
   * Share the URL of the challenge. the first 2 players to click it will be paired for a game.
   * The response body also contains `whiteUrl` and `blackUrl`.
   * You can control which color each player gets by giving them these URLs,
   * instead of the main challenge URL.
   * Open challenges expire after 24h.
   * If the challenge creation is [authenticated with OAuth2](#section/Introduction/Authentication),
   * then you can use the [challenge cancel endpoint](#operation/challengeCancel) to cancel it.
   * To directly pair 2 known players, use [this endpoint](#operation/bulkPairingList) instead.
   */
  async challengeOpen() {
    const path = "/api/challenge/open" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Start the clocks of a game immediately, even if a player has not yet made a move.
   * Requires the OAuth tokens of both players with `challenge:write` scope.
   * If the clocks have already started, the call will have no effect.
   *
   * For AI games with only one player, omit the `token2` parameter.
   */
  async challengeStartClocks(/* params: { ... } */) {
    const path = `/api/challenge/${gameId}/start-clocks` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.post({
      path /* query */ /* body */,
    });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a list of bulk pairings you created.
   */
  async bulkPairingList() {
    const path = "/api/bulk-pairing" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.BulkPairing);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Schedule many games at once, up to 24h in advance.
   * OAuth tokens are required for all paired players, with the `challenge:write` scope.
   * You can schedule up to 500 games every 10 minutes. [Contact us](mailto:contact@lichess.org) if you need higher limits.
   * If games have a real-time clock, each player must have only one pairing.
   * For correspondence games, players can have multiple pairings within the same bulk.
   *
   * **The entire bulk is rejected if:**
   *   - a token is missing
   *   - a token is present more than once (except in correspondence)
   *   - a token lacks the `challenge:write` scope
   *   - a player account is closed
   *   - a player is paired more than once (except in correspondence)
   *   - a bulk is already scheduled to start at the same time with the same player
   *   - you have 20 scheduled bulks
   *   - you have 1000 scheduled games
   *
   * Partial bulks are never created. Either it all fails, or it all succeeds.
   * When it fails, it does so with an error message explaining the issue.
   * Failed bulks are not counted in the rate limiting, they are free.
   * Fix the issues, manually or programmatically, then retry to schedule the bulk.
   * A successful bulk creation returns a JSON bulk document. Its ID can be used for further operations.
   */
  async bulkPairingCreate() {
    const path = "/api/bulk-pairing" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Immediately start all clocks of the games of a bulk pairing.
   * This overrides the `startClocksAt` value of an existing bulk pairing.
   * If the games have not yet been created (`bulk.pairAt` is in the future), then this does nothing.
   * If the clocks have already started (`bulk.startClocksAt` is in the past), then this does nothing.
   */
  async bulkPairingStartClocks(/* params: { ... } */) {
    const path = `/api/bulk-pairing/${id}/start-clocks` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get a single bulk pairing by its ID.
   */
  async bulkPairingGet(/* params: { ... } */) {
    const path = `/api/bulk-pairing/${id}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.BulkPairing;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Cancel and delete a bulk pairing that is scheduled in the future.
   * If the games have already been created, then this does nothing.
   * Canceling a bulk pairing does not refund the rate limit cost of that bulk pairing.
   */
  async bulkPairingDelete(/* params: { ... } */) {
    const path = `/api/bulk-pairing/${id}` as const;

    const { json, status } = await this.requestor.delete({ path /* body */ });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = schemas.NotFound;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Download games of a bulk in PGN or [ndjson](#section/Introduction/Streaming-with-ND-JSON) format, depending on the request `Accept` header.
   */
  async bulkPairingIdGamesGet(/* params: { ... } */) {
    const path = `/api/bulk-pairing/${id}/games` as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* mixed */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Add seconds to the opponent's clock. Can be used to create games with time odds.
   */
  async roundAddTime(/* params: { ... } */) {
    const path = `/api/round/${gameId}/add-time/${seconds}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * **This endpoint can only be used by Lichess administrators. It will not work if you do not have the appropriate permissions.** Tournament organizers should instead use [OAuth](#tag/OAuth) to obtain `challenge:write` tokens from users in order to perform bulk pairing.*
   * Create and obtain `challenge:write` tokens for multiple users.
   * If a similar token already exists for a user, it is reused. This endpoint is idempotent.
   */
  async adminChallengeTokens() {
    const path = "/api/token/admin-challenge" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Send a private message to another player.
   */
  async inboxUsername(/* params: { ... } */) {
    const path = `/inbox/${username}` as const;

    const { json, status } = await this.requestor.post({ path /* body */ });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Get the cached evaluation of a position, if available.
   * Opening positions have more chances of being available. There are about 15 million positions in the database.
   * Up to 5 variations may be available. Variants are supported.
   * Use this endpoint to fetch a few positions here and there.
   * If you want to download a lot of positions, [get the full list](https://database.lichess.org/#evals) from our exported database.
   */
  async apiCloudEval(/* params: { ... } */) {
    const path = "/api/cloud-eval" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.CloudEval;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      case 404: {
        const schema = z.object({ error: z.string().optional() });
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Lists all external engines that have been registered for the user,
   * and the credentials required to use them.
   */
  async apiExternalEngineList() {
    const path = "/api/external-engine" as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = z.array(schemas.ExternalEngine);
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Registers a new external engine for the user. It can then be selected
   * and used on the analysis board.
   * After registering, the provider should start waiting for analyis requests.
   */
  async apiExternalEngineCreate() {
    const path = "/api/external-engine" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Shared params for methods below */

  /**
   * Get properties and credentials of an external engine.
   */
  async apiExternalEngineGet() {
    const path = `/api/external-engine/${id}` as const;
    const { json, status } = await this.requestor.get({ path });
    switch (status) {
      case 200: {
        const schema = schemas.ExternalEngine;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Unregisters an external engine.
   */
  async apiExternalEngineDelete() {
    const path = `/api/external-engine/${id}` as const;
    const { json, status } = await this.requestor.delete({ path });
    switch (status) {
      case 200: {
        const schema = schemas.Ok;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Updates the properties of an external engine.
   */
  async apiExternalEnginePut() {
    const path = `/api/external-engine/${id}` as const;
    const { json, status } = await this.requestor.put({ path });
    switch (status) {
      /* switch cases; method:put */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://engine.lichess.ovh */
  /* Shared params for methods below */

  /**
   * **Endpoint: `https://engine.lichess.ovh/api/external-engine/{id}/analyse`**
   * Request analysis from an external engine.
   * Response content is streamed as [newline delimited JSON](#section/Introduction/Streaming-with-ND-JSON).
   * The properties are based on the [UCI specification](https://backscattering.de/chess/uci/#engine).
   * Analysis stops when the client goes away, the requested limit
   * is reached, or the provider goes away.
   */
  async apiExternalEngineAnalyse() {
    const path = `/api/external-engine/${id}/analyse` as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://engine.lichess.ovh */

  /**
   * **Endpoint: `https://engine.lichess.ovh/api/external-engine/work`**
   * Wait for an analysis requests to any of the external engines that
   * have been registered with the given `secret`.
   * Uses long polling.
   * After acquiring a request, the provider should immediately
   * [start streaming the results](#tag/External-engine/operation/apiExternalEngineSubmit).
   */
  async apiExternalEngineAcquire() {
    const path = "/api/external-engine/work" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://engine.lichess.ovh */
  /* Shared params for methods below */

  /**
   * **Endpoint: `https://engine.lichess.ovh/api/external-engine/work/{id}`**
   * Submit a stream of analysis as [UCI output](https://backscattering.de/chess/uci/#engine-info).
   * * The engine should always be in `UCI_Chess960` mode.
   * * `UCI_AnalyseMode` enabled if available.
   * * It produces `info` with at least:
   *   - `depth`
   *   - `multipv` (between 1 and 5)
   *   - `score`
   *   - `nodes`
   *   - `time`
   *   - `pv`
   * The server may close the connection at any time, indicating that
   * the requester has gone away and analysis should be stopped.
   */
  async apiExternalEngineSubmit() {
    const path = `/api/external-engine/work/${id}` as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * OAuth2 authorization endpoint.
   * Start the OAuth2 Authorization Code Flow with PKCE by securely
   * generating two random strings unique to each authorization
   * request:
   *
   * * `code_verifier`
   * * `state`
   *
   * Store these in session storage. Make sure not to reveal `code_verifier`
   * to eavesdroppers. Do not show it in URLs, do not abuse `state` to store
   * it, do not send it over insecure connections. However it is fine if
   * the user themselves can extract `code_verifier`, which will always be
   * possible for fully client-side apps.
   * Then send the user to this endpoint. They will be prompted to grant
   * authorization and then be redirected back to the given `redirect_uri`.
   * If the authorization failed, the following query string parameters will
   * be appended to the redirection:
   *
   * * `error`, in particular with value `access_denied` if the user
   *    cancelled authorization
   * * `error_description` to aid debugging
   * * `state`, exactly as passed in the `state` parameter
   *
   * If the authorization succeeded, the following query string parameters
   * will be appended to the redirection:
   *
   * * `code`, containing a fresh short-lived authorization code
   * * `state`, exactly as passed in the `state` parameter
   *
   * Next, to defend against cross site request forgery, check that the
   * returned `state` matches the `state` you originally generated.
   *
   * Finally, continue by using the authorization code to
   * [obtain an access token](#operation/apiToken).
   */
  async oauth(/* params: { ... } */) {
    const path = "/oauth" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* no content */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * OAuth2 token endpoint. Exchanges an authorization code for an access token.
   */
  async apiToken() {
    const path = "/api/token" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * Revokes the access token sent as Bearer for this request.
   */
  async apiTokenDelete() {
    const path = "/api/token" as const;
    const { json, status } = await this.requestor.delete({ path });
    switch (status) {
      case 204: {
        /* no content */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /**
   * For up to 1000 OAuth tokens,
   * returns their associated user ID and scopes,
   * or `null` if the token is invalid.
   * The method is `POST` so a longer list of tokens can be sent in the request body.
   */
  async tokenTest() {
    const path = "/api/token/test" as const;
    const { json, status } = await this.requestor.post({ path });
    switch (status) {
      /* switch cases; method:post */
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://explorer.lichess.ovh */

  /**
   * **Endpoint: <https://explorer.lichess.ovh/masters>**
   *
   * Example: `curl https://explorer.lichess.ovh/masters?play=d2d4,d7d5,c2c4,c7c6,c4d5`
   */
  async openingExplorerMaster(/* params: { ... } */) {
    const path = "/masters" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.OpeningExplorerMasters;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://explorer.lichess.ovh */

  /**
   * **Endpoint: <https://explorer.lichess.ovh/lichess>**
   *
   * Games sampled from all Lichess players.
   *
   * Example: `curl https://explorer.lichess.ovh/lichess?variant=standard&speeds=blitz,rapid,classical&ratings=2200,2500&fen=rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR%20w%20KQkq%20-%200%201`
   */
  async openingExplorerLichess(/* params: { ... } */) {
    const path = "/lichess" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.OpeningExplorerLichess;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://explorer.lichess.ovh */

  /**
   * **Endpoint: <https://explorer.lichess.ovh/player>**
   *
   * Games of a Lichess player.
   *
   * Responds with a stream of [newline delimited JSON](#section/Introduction/Streaming-with-ND-JSON). Will start indexing
   * on demand, immediately respond with the current results, and stream
   * more updates until indexing is complete. The stream is throttled
   * and deduplicated. Empty lines may be sent to avoid timeouts.
   *
   * Will index new games at most once per minute, and revisit previously
   * ongoing games at most once every day.
   *
   * Example: `curl https://explorer.lichess.ovh/player?player=revoof&color=white&play=d2d4,d7d5&recentGames=1`
   */
  async openingExplorerPlayer(/* params: { ... } */) {
    const path = "/player" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        /* ndjson */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://explorer.lichess.ovh */

  /**
   * **Endpoint: `https://explorer.lichess.ovh/masters/pgn/{gameId}`**
   *
   * Example: `curl https://explorer.lichess.ovh/masters/pgn/aAbqI4ey`
   */
  async openingExplorerMasterGame(/* params: { ... } */) {
    const path = `/master/pgn/${gameId}` as const;

    const { json, status } = await this.requestor.get({ path /* body */ });
    switch (status) {
      case 200: {
        /* chess-pgn */
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://tablebase.lichess.ovh */

  /**
   * **Endpoint: <https://tablebase.lichess.ovh>**
   *
   * Example: `curl http://tablebase.lichess.ovh/standard?fen=4k3/6KP/8/8/8/8/7p/8_w_-_-_0_1`
   */
  async tablebaseStandard(/* params: { ... } */) {
    const path = "/standard" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://tablebase.lichess.ovh */

  /**
   * **Endpoint: <https://tablebase.lichess.ovh>**
   */
  async tablebaseAtomic(/* params: { ... } */) {
    const path = "/atomic" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }

  /* Base URL for methods below: https://tablebase.lichess.ovh */

  /**
   * **Endpoint: <https://tablebase.lichess.ovh>**
   */
  async antichessAtomic(/* params: { ... } */) {
    const path = "/antichess" as const;
    /* const query = { ... } as const */
    const { json, status } = await this.requestor.get({
      path /* query */ /* body */,
    });
    switch (status) {
      case 200: {
        const schema = schemas.TablebaseJson;
        const data = schema.parse(json);
        return { status, data } as const;
      }
      default: {
        throw new Error("Error");
      }
    }
  }
}
