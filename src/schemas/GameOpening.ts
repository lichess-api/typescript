import * as z from "zod/mini";

const GameOpening = z.object({
  eco: z.string(),
  name: z.string(),
  ply: z.int(),
});

type GameOpening = z.infer<typeof GameOpening>;

export { GameOpening };
