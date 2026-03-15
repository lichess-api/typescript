import * as z from "minizod";

import { BroadcastCustomPointsPerColor } from "./BroadcastCustomPointsPerColor";

const BroadcastCustomScoring = z.object({
  white: BroadcastCustomPointsPerColor,
  black: BroadcastCustomPointsPerColor,
});

type BroadcastCustomScoring = z.infer<typeof BroadcastCustomScoring>;

export { BroadcastCustomScoring };
