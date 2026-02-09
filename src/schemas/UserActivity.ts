import * as z from "zod/mini";

import { Flair } from "./Flair";
import { PuzzleModePerf } from "./PuzzleModePerf";
import { UserActivityCorrespondenceGame } from "./UserActivityCorrespondenceGame";
import { UserActivityFollowList } from "./UserActivityFollowList";
import { UserActivityScore } from "./UserActivityScore";

const UserActivity = z.object({
  interval: z.object({
    start: z.int(),
    end: z.int(),
  }),
  games: z.optional(
    z.object({
      chess960: z.optional(UserActivityScore),
      atomic: z.optional(UserActivityScore),
      racingKings: z.optional(UserActivityScore),
      ultraBullet: z.optional(UserActivityScore),
      blitz: z.optional(UserActivityScore),
      kingOfTheHill: z.optional(UserActivityScore),
      bullet: z.optional(UserActivityScore),
      correspondence: z.optional(UserActivityScore),
      horde: z.optional(UserActivityScore),
      puzzle: z.optional(UserActivityScore),
      classical: z.optional(UserActivityScore),
      rapid: z.optional(UserActivityScore),
    }),
  ),
  puzzles: z.optional(z.object({ score: z.optional(UserActivityScore) })),
  storm: z.optional(PuzzleModePerf),
  racer: z.optional(PuzzleModePerf),
  streak: z.optional(PuzzleModePerf),
  tournaments: z.optional(
    z.object({
      nb: z.optional(z.int()),
      best: z.optional(
        z.array(
          z.object({
            tournament: z.object({
              id: z.string(),
              name: z.string(),
            }),
            nbGames: z.int(),
            score: z.int(),
            rank: z.int(),
            rankPercent: z.int(),
          }),
        ),
      ),
    }),
  ),
  practice: z.optional(
    z.array(
      z.object({
        url: z.string(),
        name: z.string(),
        nbPositions: z.int(),
      }),
    ),
  ),
  simuls: z.optional(z.array(z.string())),
  correspondenceMoves: z.optional(
    z.object({
      nb: z.int(),
      games: z.array(UserActivityCorrespondenceGame),
    }),
  ),
  correspondenceEnds: z.optional(
    z.object({
      correspondence: z.object({
        score: UserActivityScore,
        games: z.array(UserActivityCorrespondenceGame),
      }),
    }),
  ),
  follows: z.optional(
    z.object({
      in: z.optional(UserActivityFollowList),
      out: z.optional(UserActivityFollowList),
    }),
  ),
  studies: z.optional(
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      }),
    ),
  ),
  teams: z.optional(
    z.array(
      z.object({
        url: z.url(),
        name: z.string(),
        flair: z.optional(Flair),
      }),
    ),
  ),
  posts: z.optional(
    z.array(
      z.object({
        topicUrl: z.string(),
        topicName: z.string(),
        posts: z.array(
          z.object({
            url: z.string(),
            text: z.string(),
          }),
        ),
      }),
    ),
  ),
  patron: z.optional(z.object({ months: z.int() })),
  stream: z.optional(z.boolean()),
});

type UserActivity = z.infer<typeof UserActivity>;

export { UserActivity };
