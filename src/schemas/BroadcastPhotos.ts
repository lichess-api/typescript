import * as z from "zod";

const BroadcastPhotos = z.record(
  z.string(),
  z.object({
    small: z.string(),
    medium: z.string(),
    credit: z.string().optional(),
  }),
);

type BroadcastPhotos = z.infer<typeof BroadcastPhotos>;

export { BroadcastPhotos };
