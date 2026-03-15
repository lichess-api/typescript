import * as z from "minizod";

import { GameEventInfo } from "./GameEventInfo";

const GameFinishEvent = z.object({
  type: z.literal("gameFinish"),
  game: GameEventInfo,
});

type GameFinishEvent = z.infer<typeof GameFinishEvent>;

export { GameFinishEvent };
