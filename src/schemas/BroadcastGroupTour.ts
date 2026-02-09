import * as z from "zod/mini";

const BroadcastGroupTour = z.object({
  id: z.string(),
  name: z.string(),
  active: z.boolean(),
  live: z.boolean(),
});

type BroadcastGroupTour = z.infer<typeof BroadcastGroupTour>;

export { BroadcastGroupTour };
