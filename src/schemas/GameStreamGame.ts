import * as z from "zod/mini";

import { GameColor } from "./GameColor";
import { GameStatusId } from "./GameStatusId";
import { GameStatusName } from "./GameStatusName";
import { PerfType } from "./PerfType";
import { Speed } from "./Speed";
import { VariantKey } from "./VariantKey";

const GameStreamGame = z.object({
  id: z.string(),
  rated: z.optional(z.boolean()),
  variant: z.optional(VariantKey),
  speed: z.optional(Speed),
  perf: z.optional(PerfType),
  createdAt: z.optional(z.int()),
  status: z.optional(GameStatusId),
  statusName: z.optional(GameStatusName),
  clock: z.optional(
    z.object({
      initial: z.optional(z.int()),
      increment: z.optional(z.int()),
      totalTime: z.optional(z.int()),
    }),
  ),
  players: z.optional(
    z.object({
      white: z.optional(
        z.object({
          userId: z.optional(z.string()),
          rating: z.optional(z.int()),
        }),
      ),
      black: z.optional(
        z.object({
          userId: z.optional(z.string()),
          rating: z.optional(z.int()),
        }),
      ),
    }),
  ),
  winner: z.optional(GameColor),
});

type GameStreamGame = z.infer<typeof GameStreamGame>;

export { GameStreamGame };
