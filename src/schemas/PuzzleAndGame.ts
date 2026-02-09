import * as z from "zod/mini";

import { Flair } from "./Flair";
import { GameColor } from "./GameColor";
import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";
import { PerfType } from "./PerfType";
import { Title } from "./Title";

const PuzzleAndGame = z.object({
  game: z.object({
    clock: z.string(),
    id: z.string(),
    perf: z.object({
      key: PerfType,
      name: z.string(),
    }),
    pgn: z.string(),
    players: z.tuple([
      z.object({
        color: GameColor,
        flair: z.optional(Flair),
        id: z.string(),
        name: z.string(),
        patron: z.optional(Patron),
        patronColor: z.optional(PatronColor),
        rating: z.int(),
        title: z.optional(Title),
      }),
      z.object({
        color: GameColor,
        flair: z.optional(Flair),
        id: z.string(),
        name: z.string(),
        patron: z.optional(Patron),
        patronColor: z.optional(PatronColor),
        rating: z.int(),
        title: z.optional(Title),
      }),
    ]),
    rated: z.boolean(),
  }),
  puzzle: z.object({
    id: z.string(),
    initialPly: z.int(),
    plays: z.int(),
    rating: z.int(),
    solution: z.array(z.string()),
    themes: z.array(z.string()),
  }),
});

type PuzzleAndGame = z.infer<typeof PuzzleAndGame>;

export { PuzzleAndGame };
