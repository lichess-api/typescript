import * as z from "zod/mini";

const PuzzlePerformance = z.object({
  firstWins: z.int(),
  nb: z.int(),
  performance: z.int(),
  puzzleRatingAvg: z.int(),
  replayWins: z.int(),
});

type PuzzlePerformance = z.infer<typeof PuzzlePerformance>;

export { PuzzlePerformance };
