import * as z from "minizod";

import { GameStreamGame } from "./GameStreamGame";

const GameStream = z.array(GameStreamGame);

type GameStream = z.infer<typeof GameStream>;

export { GameStream };
