import * as z from "minizod";

import { BroadcastCustomPoints } from "./BroadcastCustomPoints";
import { BroadcastPlayerWithFed } from "./BroadcastPlayerWithFed";
import { BroadcastPointStr } from "./BroadcastPointStr";
import { FideTimeControl } from "./FideTimeControl";
import { GameColor } from "./GameColor";

const BroadcastGameEntry = z.object({
  round: z.string(),
  id: z.string(),
  opponent: BroadcastPlayerWithFed,
  color: GameColor,
  points: z.optional(BroadcastPointStr),
  customPoints: z.optional(BroadcastCustomPoints),
  ratingDiff: z.optional(z.int()),
  fideTC: FideTimeControl,
});

type BroadcastGameEntry = z.infer<typeof BroadcastGameEntry>;

export { BroadcastGameEntry };
