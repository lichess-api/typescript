import * as z from "zod/mini";

const TimelineEntrySimul = z.object({
  type: z.literal(["simul-create", "simul-join"]),
  date: z.number(),
  data: z.object({
    userId: z.string(),
    simulId: z.string(),
    simulName: z.string(),
  }),
});

type TimelineEntrySimul = z.infer<typeof TimelineEntrySimul>;

export { TimelineEntrySimul };
