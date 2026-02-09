import * as z from "zod/mini";

const PuzzleBatchSolveRequest = z.object({
  solutions: z.optional(
    z.array(
      z.object({
        id: z.optional(z.string()),
        win: z.optional(z.boolean()),
        rated: z.optional(z.boolean()),
      }),
    ),
  ),
});

type PuzzleBatchSolveRequest = z.infer<typeof PuzzleBatchSolveRequest>;

export { PuzzleBatchSolveRequest };
