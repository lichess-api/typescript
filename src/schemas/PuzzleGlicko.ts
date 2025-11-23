import * as z from "zod";

const PuzzleGlicko = z.object({
  rating: z.number().optional(),
  deviation: z.number().optional(),
  provisional: z.boolean().optional(),
});

type PuzzleGlicko = z.infer<typeof PuzzleGlicko>;

export { PuzzleGlicko };
export default PuzzleGlicko;
