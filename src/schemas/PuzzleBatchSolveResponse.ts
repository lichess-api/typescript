import * as z from "zod";

import PuzzleAndGame from "./PuzzleAndGame";
import PuzzleGlicko from "./PuzzleGlicko";

const PuzzleBatchSolveResponse = z.object({
  puzzles: z.array(PuzzleAndGame).optional(),
  glicko: PuzzleGlicko.optional(),
  rounds: z
    .array(
      z.object({
        id: z.string().optional(),
        win: z.boolean().optional(),
        ratingDiff: z.int().optional(),
      })
    )
    .optional(),
});

type PuzzleBatchSolveResponse = z.infer<typeof PuzzleBatchSolveResponse>;

export { PuzzleBatchSolveResponse };
export default PuzzleBatchSolveResponse;
