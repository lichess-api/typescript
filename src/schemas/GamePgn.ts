import * as z from "zod/mini";

const GamePgn = z.string();

type GamePgn = z.infer<typeof GamePgn>;

export { GamePgn };
