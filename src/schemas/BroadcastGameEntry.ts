import * as z from "zod/mini";

import { BroadcastCustomPoints } from "./BroadcastCustomPoints";
import { BroadcastPlayerWithFed } from "./BroadcastPlayerWithFed";
import { FideTimeControl } from "./FideTimeControl";
import { GameColor } from "./GameColor";

const BroadcastGameEntry = z.object({
  round: z.string(),
  id: z.string(),
  opponent: BroadcastPlayerWithFed,
  color: GameColor,
  points: z.optional(z.literal(["1", "1/2", "0"])),
  customPoints: z.optional(BroadcastCustomPoints),
  ratingDiff: z.optional(z.int()),
  fideTC: z.optional(FideTimeControl),
});

type BroadcastGameEntry = z.infer<typeof BroadcastGameEntry>;

export { BroadcastGameEntry };
