import * as z from "zod/mini";

const SwissFromPositionFEN = z.string();

type SwissFromPositionFEN = z.infer<typeof SwissFromPositionFEN>;

export { SwissFromPositionFEN };
