import * as z from "minizod";

const GameCompat = z.object({
  bot: z.optional(z.boolean()),
  board: z.optional(z.boolean()),
});

type GameCompat = z.infer<typeof GameCompat>;

export { GameCompat };
