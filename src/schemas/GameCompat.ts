import * as z from "zod/mini";

const GameCompat = z.object({
  bot: z.optional(z.boolean()),
  board: z.optional(z.boolean()),
});

type GameCompat = z.infer<typeof GameCompat>;

export { GameCompat };
