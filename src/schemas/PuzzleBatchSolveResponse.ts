import * as z from "zod/mini";

import { PuzzleAndGame } from "./PuzzleAndGame";
import { PuzzleGlicko } from "./PuzzleGlicko";

const PuzzleBatchSolveResponse = z.object({
  puzzles: z.optional(z.array(PuzzleAndGame)),
  glicko: z.optional(PuzzleGlicko),
  rounds: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string()),
        win: z.optional(z.boolean()),
        ratingDiff: z.optional(z.int()),
      }),
    ),
  ),
});

type PuzzleBatchSolveResponse = z.infer<typeof PuzzleBatchSolveResponse>;

export { PuzzleBatchSolveResponse };
