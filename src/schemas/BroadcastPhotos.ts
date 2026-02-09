import * as z from "zod/mini";

const BroadcastPhotos = z.record(
  z.string(),
  z.object({
    small: z.string(),
    medium: z.string(),
    credit: z.optional(z.string()),
  }),
);

type BroadcastPhotos = z.infer<typeof BroadcastPhotos>;

export { BroadcastPhotos };
