import * as z from "zod/mini";

const PuzzleGlicko = z.object({
  rating: z.optional(z.number()),
  deviation: z.optional(z.number()),
  provisional: z.optional(z.boolean()),
});

type PuzzleGlicko = z.infer<typeof PuzzleGlicko>;

export { PuzzleGlicko };
