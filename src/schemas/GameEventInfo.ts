import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { GameCompat } from "./GameCompat";
import { GameEventOpponent } from "./GameEventOpponent";
import { GameSource } from "./GameSource";
import { GameStatus } from "./GameStatus";
import { Speed } from "./Speed";
import { Variant } from "./Variant";

const GameEventInfo = z.object({
  fullId: z.string(),
  gameId: z.string(),
  fen: z.optional(z.string()),
  color: z.optional(GameColor),
  lastMove: z.optional(z.string()),
  source: z.optional(GameSource),
  status: z.optional(GameStatus),
  variant: z.optional(Variant),
  speed: z.optional(Speed),
  perf: z.optional(z.string()),
  rated: z.optional(z.boolean()),
  hasMoved: z.optional(z.boolean()),
  opponent: z.optional(GameEventOpponent),
  isMyTurn: z.optional(z.boolean()),
  secondsLeft: z.optional(z.int()),
  winner: z.optional(GameColor),
  ratingDiff: z.optional(z.int()),
  compat: z.optional(GameCompat),
  id: z.optional(z.string()),
  tournamentId: z.optional(z.string()),
});

type GameEventInfo = z.infer<typeof GameEventInfo>;

export { GameEventInfo };
