import * as z from "zod/mini";

import { Patron } from "./Patron";
import { PatronColor } from "./PatronColor";

const PuzzleRaceResults = z.object({
  id: z.string(),
  owner: z.string(),
  players: z.array(
    z.object({
      name: z.string(),
      score: z.int(),
      id: z.optional(z.string()),
      flair: z.optional(z.string()),
      patron: z.optional(Patron),
      patronColor: z.optional(PatronColor),
    }),
  ),
  puzzles: z.array(
    z.object({
      id: z.string(),
      fen: z.string(),
      line: z.string(),
      rating: z.int(),
    }),
  ),
  finishesAt: z.int(),
  startsAt: z.int(),
});

type PuzzleRaceResults = z.infer<typeof PuzzleRaceResults>;

export { PuzzleRaceResults };
