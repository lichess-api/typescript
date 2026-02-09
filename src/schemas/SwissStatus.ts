import * as z from "zod/mini";

const SwissStatus = z.literal(["created", "started", "finished"]);

type SwissStatus = z.infer<typeof SwissStatus>;

export { SwissStatus };
