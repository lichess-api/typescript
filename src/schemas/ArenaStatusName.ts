import * as z from "zod/mini";

const ArenaStatusName = z.literal(["created", "started", "finished"]);

type ArenaStatusName = z.infer<typeof ArenaStatusName>;

export { ArenaStatusName };
