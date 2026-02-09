import * as z from "zod/mini";

const GameEventOpponent = z.union([
  z.object({
    id: z.string(),
    username: z.string(),
    rating: z.int(),
    ratingDiff: z.optional(z.int()),
  }),
  z.object({
    id: z.null(),
    username: z.string(),
    ai: z.int(),
  }),
]);

type GameEventOpponent = z.infer<typeof GameEventOpponent>;

export { GameEventOpponent };
