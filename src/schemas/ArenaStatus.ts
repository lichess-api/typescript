import * as z from "zod/mini";

const ArenaStatus = z.literal([10, 20, 30]);

type ArenaStatus = z.infer<typeof ArenaStatus>;

export { ArenaStatus };
