import * as z from "zod/mini";

const GameColor = z.literal(["white", "black"]);

type GameColor = z.infer<typeof GameColor>;

export { GameColor };
