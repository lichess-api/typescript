import * as z from "minizod";

const FromPositionFEN = z.string();

type FromPositionFEN = z.infer<typeof FromPositionFEN>;

export { FromPositionFEN };
