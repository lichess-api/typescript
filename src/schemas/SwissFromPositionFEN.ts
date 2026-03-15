import * as z from "minizod";

const SwissFromPositionFEN = z.string();

type SwissFromPositionFEN = z.infer<typeof SwissFromPositionFEN>;

export { SwissFromPositionFEN };
