import * as z from "zod/mini";

import { GameEventInfo } from "./GameEventInfo";

const GameFinishEvent = z.object({
  type: z.literal("gameFinish"),
  game: GameEventInfo,
});

type GameFinishEvent = z.infer<typeof GameFinishEvent>;

export { GameFinishEvent };
