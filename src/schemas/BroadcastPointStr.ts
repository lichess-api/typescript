import * as z from "minizod";

const BroadcastPointStr = z.literal(["1", "1/2", "0"]);

type BroadcastPointStr = z.infer<typeof BroadcastPointStr>;

export { BroadcastPointStr };
