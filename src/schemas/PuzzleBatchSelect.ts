import * as z from "zod/mini";

import { PuzzleAndGame } from "./PuzzleAndGame";
import { PuzzleGlicko } from "./PuzzleGlicko";

const PuzzleBatchSelect = z.object({
  puzzles: z.optional(z.array(PuzzleAndGame)),
  glicko: z.optional(PuzzleGlicko),
});

type PuzzleBatchSelect = z.infer<typeof PuzzleBatchSelect>;

export { PuzzleBatchSelect };
