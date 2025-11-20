import * as z from "zod";

import PuzzleAndGame from "./PuzzleAndGame";
import PuzzleGlicko from "./PuzzleGlicko";

const PuzzleBatchSelect = z.object({
  puzzles: z.array(PuzzleAndGame).optional(),
  glicko: PuzzleGlicko.optional(),
});

type PuzzleBatchSelect = z.infer<typeof PuzzleBatchSelect>;

export { PuzzleBatchSelect };
export default PuzzleBatchSelect;
