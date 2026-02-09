import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { GameMoveAnalysis } from "./GameMoveAnalysis";
import { GameOpening } from "./GameOpening";
import { GamePlayers } from "./GamePlayers";
import { GameStatusName } from "./GameStatusName";
import { Speed } from "./Speed";
import { VariantKey } from "./VariantKey";

const GameJson = z.object({
  id: z.string(),
  rated: z.boolean(),
  variant: VariantKey,
  speed: Speed,
  perf: z.string(),
  createdAt: z.int(),
  lastMoveAt: z.int(),
  status: GameStatusName,
  source: z.optional(z.string()),
  players: GamePlayers,
  initialFen: z.optional(z.string()),
  winner: z.optional(GameColor),
  opening: z.optional(GameOpening),
  moves: z.optional(z.string()),
  pgn: z.optional(z.string()),
  daysPerTurn: z.optional(z.int()),
  analysis: z.optional(z.array(GameMoveAnalysis)),
  tournament: z.optional(z.string()),
  swiss: z.optional(z.string()),
  clock: z.optional(
    z.object({
      initial: z.int(),
      increment: z.int(),
      totalTime: z.int(),
    }),
  ),
  clocks: z.optional(z.array(z.int())),
  division: z.optional(
    z.object({
      middle: z.optional(z.int()),
      end: z.optional(z.int()),
    }),
  ),
});

type GameJson = z.infer<typeof GameJson>;

export { GameJson };
