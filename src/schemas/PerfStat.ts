import * as z from "zod/mini";

import { LightUser } from "./LightUser";

const PerfStat = z.object({
  user: z.object({ name: z.string() }),
  perf: z.object({
    glicko: z.optional(
      z.object({
        rating: z.optional(z.number()),
        deviation: z.optional(z.number()),
        provisional: z.optional(z.boolean()),
      }),
    ),
    nb: z.optional(z.int()),
    progress: z.optional(z.int()),
  }),
  rank: z.nullable(z.int()),
  percentile: z.number(),
  stat: z.object({
    highest: z.optional(
      z.object({
        int: z.int(),
        at: z.iso.datetime(),
        gameId: z.string(),
      }),
    ),
    lowest: z.optional(
      z.object({
        int: z.int(),
        at: z.iso.datetime(),
        gameId: z.string(),
      }),
    ),
    bestWins: z.object({
      results: z.array(
        z.object({
          opRating: z.int(),
          opId: LightUser,
          at: z.iso.datetime(),
          gameId: z.string(),
        }),
      ),
    }),
    worstLosses: z.object({
      results: z.array(
        z.object({
          opRating: z.int(),
          opId: LightUser,
          at: z.iso.datetime(),
          gameId: z.string(),
        }),
      ),
    }),
    count: z.object({
      all: z.int(),
      rated: z.int(),
      win: z.int(),
      loss: z.int(),
      draw: z.int(),
      tour: z.int(),
      berserk: z.int(),
      opAvg: z.number(),
      seconds: z.int(),
      disconnects: z.int(),
    }),
    resultStreak: z.object({
      win: z.object({
        cur: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
        }),
        max: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
        }),
      }),
      loss: z.object({
        cur: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
        }),
        max: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.string(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.string(),
              gameId: z.string(),
            }),
          ),
        }),
      }),
    }),
    playStreak: z.object({
      nb: z.object({
        cur: z.object({ v: z.int() }),
        max: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
        }),
      }),
      time: z.object({
        cur: z.object({ v: z.int() }),
        max: z.object({
          v: z.int(),
          from: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
          to: z.optional(
            z.object({
              at: z.iso.datetime(),
              gameId: z.string(),
            }),
          ),
        }),
      }),
      lastDate: z.optional(z.iso.datetime()),
    }),
  }),
});

type PerfStat = z.infer<typeof PerfStat>;

export { PerfStat };
