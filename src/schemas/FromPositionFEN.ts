import * as z from "zod/mini";

const FromPositionFEN = z.string();

type FromPositionFEN = z.infer<typeof FromPositionFEN>;

export { FromPositionFEN };
