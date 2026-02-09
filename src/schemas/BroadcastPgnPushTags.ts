import * as z from "zod/mini";

const BroadcastPgnPushTags = z.record(z.string(), z.string());

type BroadcastPgnPushTags = z.infer<typeof BroadcastPgnPushTags>;

export { BroadcastPgnPushTags };
