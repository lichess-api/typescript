import * as z from "zod/mini";

import { GamePlayerUser } from "./GamePlayerUser";

const GamePlayers = z.object({
  white: GamePlayerUser,
  black: GamePlayerUser,
});

type GamePlayers = z.infer<typeof GamePlayers>;

export { GamePlayers };
