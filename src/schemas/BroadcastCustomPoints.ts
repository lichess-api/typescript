import * as z from "zod/mini";

const BroadcastCustomPoints = z
  .number()
  .check(z.minimum(0))
  .check(z.maximum(10));

type BroadcastCustomPoints = z.infer<typeof BroadcastCustomPoints>;

export { BroadcastCustomPoints };
