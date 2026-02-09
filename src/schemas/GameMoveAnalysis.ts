import * as z from "zod/mini";

const GameMoveAnalysis = z.object({
  eval: z.optional(z.int()),
  mate: z.optional(z.int()),
  best: z.optional(z.string()),
  variation: z.optional(z.string()),
  judgment: z.optional(
    z.object({
      name: z.optional(z.literal(["Inaccuracy", "Mistake", "Blunder"])),
      comment: z.optional(z.string()),
    }),
  ),
});

type GameMoveAnalysis = z.infer<typeof GameMoveAnalysis>;

export { GameMoveAnalysis };
