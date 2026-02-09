import * as z from "zod/mini";

import { GameEventInfo } from "./GameEventInfo";

const GameStartEvent = z.object({
  type: z.literal("gameStart"),
  game: GameEventInfo,
});

type GameStartEvent = z.infer<typeof GameStartEvent>;

export { GameStartEvent };
