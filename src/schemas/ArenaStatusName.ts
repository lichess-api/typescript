import * as z from "minizod";

const ArenaStatusName = z.literal(["created", "started", "finished"]);

type ArenaStatusName = z.infer<typeof ArenaStatusName>;

export { ArenaStatusName };
