import * as z from "minizod";

const GamePgn = z.string();

type GamePgn = z.infer<typeof GamePgn>;

export { GamePgn };
