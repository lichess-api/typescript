import * as z from "minizod";

const GameColor = z.literal(["white", "black"]);

type GameColor = z.infer<typeof GameColor>;

export { GameColor };
