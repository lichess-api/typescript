import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { GamePlayers } from "./GamePlayers";
import { GameSource } from "./GameSource";
import { GameStatus } from "./GameStatus";
import { PerfType } from "./PerfType";
import { Speed } from "./Speed";
import { Variant } from "./Variant";

const MoveStreamEntry = z.union([
  z.object({
    id: z.string(),
    variant: z.optional(Variant),
    speed: z.optional(Speed),
    perf: z.optional(PerfType),
    rated: z.optional(z.boolean()),
    initialFen: z.optional(z.string()),
    fen: z.optional(z.string()),
    player: z.optional(GameColor),
    turns: z.optional(z.int()),
    startedAtTurn: z.optional(z.int()),
    source: z.optional(GameSource),
    status: z.optional(GameStatus),
    createdAt: z.optional(z.int()),
    lastMove: z.optional(z.string()),
    players: z.optional(GamePlayers),
  }),
  z.object({
    fen: z.string(),
    lm: z.optional(z.string()),
    wc: z.int(),
    bc: z.int(),
  }),
]);

type MoveStreamEntry = z.infer<typeof MoveStreamEntry>;

export { MoveStreamEntry };
