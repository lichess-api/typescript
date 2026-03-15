import * as z from "minizod";

const GameOpening = z.object({
  eco: z.string(),
  name: z.string(),
  ply: z.int(),
});

type GameOpening = z.infer<typeof GameOpening>;

export { GameOpening };
