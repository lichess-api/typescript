import * as z from "zod/mini";

import { GameEventPlayer } from "./GameEventPlayer";
import { GameStateEvent } from "./GameStateEvent";
import { Speed } from "./Speed";
import { Variant } from "./Variant";

const GameFullEvent = z.object({
  type: z.literal("gameFull"),
  id: z.string(),
  variant: Variant,
  clock: z.optional(
    z.object({
      initial: z.optional(z.int()),
      increment: z.optional(z.int()),
    }),
  ),
  speed: Speed,
  perf: z.object({ name: z.optional(z.string()) }),
  rated: z.boolean(),
  createdAt: z.int(),
  white: GameEventPlayer,
  black: GameEventPlayer,
  initialFen: z.string(),
  state: GameStateEvent,
  daysPerTurn: z.optional(z.int()),
  tournamentId: z.optional(z.string()),
});

type GameFullEvent = z.infer<typeof GameFullEvent>;

export { GameFullEvent };
