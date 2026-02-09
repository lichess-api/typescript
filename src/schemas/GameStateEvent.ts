import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { GameStatusName } from "./GameStatusName";

const GameStateEvent = z.object({
  type: z.literal("gameState"),
  moves: z.string(),
  wtime: z.int(),
  btime: z.int(),
  winc: z.int(),
  binc: z.int(),
  status: GameStatusName,
  winner: z.optional(GameColor),
  wdraw: z.optional(z.boolean()),
  bdraw: z.optional(z.boolean()),
  wtakeback: z.optional(z.boolean()),
  btakeback: z.optional(z.boolean()),
  expiration: z.optional(
    z.object({
      idleMillis: z.int(),
      millisToMove: z.int(),
    }),
  ),
});

type GameStateEvent = z.infer<typeof GameStateEvent>;

export { GameStateEvent };
