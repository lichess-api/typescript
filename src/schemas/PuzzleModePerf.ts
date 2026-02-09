import * as z from "zod/mini";

const PuzzleModePerf = z.object({
  runs: z.int(),
  score: z.int(),
});

type PuzzleModePerf = z.infer<typeof PuzzleModePerf>;

export { PuzzleModePerf };
