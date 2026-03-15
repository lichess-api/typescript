import * as z from "minizod";

import { GamePlayerUser } from "./GamePlayerUser";

const GamePlayers = z.object({
  white: GamePlayerUser,
  black: GamePlayerUser,
});

type GamePlayers = z.infer<typeof GamePlayers>;

export { GamePlayers };
